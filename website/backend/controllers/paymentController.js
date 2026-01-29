/**
 * Payment Controller for ctechrnd.com
 * Handles Stripe payment processing, webhooks, and payment management
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

/**
 * Create Payment Intent
 * POST /api/payments/create-intent
 */
exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'inr', productId, productType, userId, email } = req.body;

    // Validation
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to smallest currency unit
      currency: currency.toLowerCase(),
      metadata: {
        productId: productId || 'N/A',
        productType: productType || 'subscription',
        userId: userId,
        email: email || 'N/A'
      },
      description: `Product purchase - ${productType || 'subscription'}`,
      receipt_email: email
    });

    // Save to database
    const connection = await pool.getConnection();
    
    await connection.execute(
      `INSERT INTO payments 
      (user_id, transaction_id, product_id, product_type, amount, currency, status, stripe_payment_intent_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, paymentIntent.id, productId || null, productType || 'subscription', amount, currency, 'pending', paymentIntent.id]
    );

    connection.release();

    // Log the event
    logPaymentEvent('payment_intent_created', 'stripe', paymentIntent.id, {
      amount,
      currency,
      userId,
      productId
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount,
      currency
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Confirm Payment
 * POST /api/payments/confirm
 */
exports.confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId, userId } = req.body;

    const connection = await pool.getConnection();

    // Retrieve payment from database
    const [payments] = await connection.execute(
      'SELECT * FROM payments WHERE transaction_id = ? AND user_id = ?',
      [paymentIntentId, userId]
    );

    if (!payments.length) {
      connection.release();
      return res.status(404).json({ error: 'Payment not found' });
    }

    const payment = payments[0];

    // Confirm with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      connection.release();
      return res.status(400).json({ error: 'Payment not succeeded', status: paymentIntent.status });
    }

    // Update payment status
    await connection.execute(
      `UPDATE payments 
      SET status = 'completed', updated_at = NOW() 
      WHERE transaction_id = ?`,
      [paymentIntentId]
    );

    // Grant access based on product type
    if (payment.product_type === 'subscription') {
      const planName = determinePlanName(payment.amount);
      
      await connection.execute(
        `UPDATE users 
        SET subscription_tier = ?, subscription_start_date = NOW(), subscription_end_date = DATE_ADD(NOW(), INTERVAL 1 MONTH)
        WHERE id = ?`,
        [planName, userId]
      );

      // Create subscription record
      await connection.execute(
        `INSERT INTO subscriptions 
        (user_id, plan_id, plan_name, status, stripe_subscription_id, amount, billing_cycle, start_date, end_date, payment_method)
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 1 MONTH), 'stripe')`,
        [userId, `plan_${planName}`, planName, 'active', paymentIntentId, payment.amount, 'monthly']
      );
    }

    // Create invoice
    const invoiceNumber = generateInvoiceNumber();
    await connection.execute(
      `INSERT INTO invoices 
      (invoice_number, payment_id, user_id, amount, total_amount, status, issued_date)
      VALUES (?, ?, ?, ?, ?, 'issued', NOW())`,
      [invoiceNumber, payment.id, userId, payment.amount, payment.amount]
    );

    connection.release();

    // Send confirmation email
    await sendPaymentConfirmationEmail(userId, payment, invoiceNumber, paymentIntent);

    // Log event
    logPaymentEvent('payment_confirmed', 'stripe', paymentIntentId, {
      userId,
      amount: payment.amount,
      productType: payment.product_type
    });

    res.json({
      success: true,
      message: 'Payment confirmed successfully',
      paymentId: payment.id,
      invoiceNumber,
      status: 'completed'
    });
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get Payment History
 * GET /api/payments/history/:userId
 */
exports.getPaymentHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 10, offset = 0 } = req.query;

    const connection = await pool.getConnection();

    const [payments] = await connection.execute(
      `SELECT 
        id, amount, currency, status, payment_method, created_at, product_type
      FROM payments 
      WHERE user_id = ? 
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?`,
      [userId, parseInt(limit), parseInt(offset)]
    );

    const [totalResult] = await connection.execute(
      'SELECT COUNT(*) as total FROM payments WHERE user_id = ?',
      [userId]
    );

    connection.release();

    res.json({
      success: true,
      payments,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total: totalResult[0].total
      }
    });
  } catch (error) {
    console.error('Error fetching payment history:', error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get Payment Details
 * GET /api/payments/:paymentIntentId
 */
exports.getPaymentDetails = async (req, res) => {
  try {
    const { paymentIntentId } = req.params;

    const connection = await pool.getConnection();

    const [payments] = await connection.execute(
      'SELECT * FROM payments WHERE transaction_id = ? OR id = ?',
      [paymentIntentId, paymentIntentId]
    );

    connection.release();

    if (!payments.length) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    const payment = payments[0];
    
    // Get from Stripe if available
    let stripeData = null;
    if (payment.stripe_payment_intent_id) {
      try {
        stripeData = await stripe.paymentIntents.retrieve(payment.stripe_payment_intent_id);
      } catch (e) {
        console.error('Error fetching from Stripe:', e);
      }
    }

    res.json({
      success: true,
      payment,
      stripeData
    });
  } catch (error) {
    console.error('Error fetching payment details:', error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Refund Payment
 * POST /api/payments/:paymentId/refund
 */
exports.refundPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { reason, partialAmount } = req.body;

    const connection = await pool.getConnection();

    // Get payment details
    const [payments] = await connection.execute(
      'SELECT * FROM payments WHERE id = ? AND status = ?',
      [paymentId, 'completed']
    );

    if (!payments.length) {
      connection.release();
      return res.status(404).json({ error: 'Payment not found or already refunded' });
    }

    const payment = payments[0];
    const refundAmount = partialAmount || payment.amount;

    // Process refund with Stripe
    const refund = await stripe.refunds.create({
      payment_intent: payment.stripe_payment_intent_id,
      amount: Math.round(refundAmount * 100),
      metadata: { reason }
    });

    // Record refund in database
    await connection.execute(
      `INSERT INTO refunds 
      (payment_id, amount, reason, status, stripe_refund_id, completed_date)
      VALUES (?, ?, ?, ?, ?, NOW())`,
      [paymentId, refundAmount, reason, 'completed', refund.id]
    );

    // Update payment status if full refund
    if (refundAmount === payment.amount) {
      await connection.execute(
        'UPDATE payments SET status = ? WHERE id = ?',
        ['refunded', paymentId]
      );
    }

    connection.release();

    res.json({
      success: true,
      refundId: refund.id,
      amount: refundAmount,
      status: refund.status
    });
  } catch (error) {
    console.error('Error refunding payment:', error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Handle Stripe Webhook
 * POST /api/payments/webhook
 */
exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    const connection = await pool.getConnection();

    // Store event
    await connection.execute(
      `INSERT INTO payment_events 
      (event_id, event_type, source, transaction_id, payload, status)
      VALUES (?, ?, 'stripe', ?, ?, 'received')`,
      [event.id, event.type, event.data.object.id, JSON.stringify(event.data)]
    );

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object, connection);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object, connection);
        break;

      case 'charge.refunded':
        await handleChargeRefunded(event.data.object, connection);
        break;

      case 'invoice.paid':
        await handleInvoicePaid(event.data.object, connection);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionCancelled(event.data.object, connection);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Update event status
    await connection.execute(
      `UPDATE payment_events SET status = 'processed', processed_at = NOW() WHERE event_id = ?`,
      [event.id]
    );

    connection.release();

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    
    // Still return 200 to prevent retries, but log the error
    if (process.env.NODE_ENV === 'development') {
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }
    
    res.json({ received: true, error: error.message });
  }
};

/**
 * Get Payment Statistics
 * GET /api/payments/stats
 */
exports.getPaymentStatistics = async (req, res) => {
  try {
    const { period = 'month' } = req.query; // day, week, month, year

    const connection = await pool.getConnection();

    let dateFilter = 'DATE(created_at) = CURDATE()';
    if (period === 'week') {
      dateFilter = 'WEEK(created_at) = WEEK(CURDATE())';
    } else if (period === 'month') {
      dateFilter = 'MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())';
    } else if (period === 'year') {
      dateFilter = 'YEAR(created_at) = YEAR(CURDATE())';
    }

    const [stats] = await connection.execute(`
      SELECT 
        COUNT(*) as total_transactions,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_transactions,
        SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END) as total_revenue,
        AVG(CASE WHEN status = 'completed' THEN amount ELSE NULL END) as average_transaction,
        MIN(amount) as min_amount,
        MAX(amount) as max_amount,
        COUNT(DISTINCT user_id) as unique_customers
      FROM payments
      WHERE ${dateFilter}
    `);

    const [paymentMethods] = await connection.execute(`
      SELECT 
        payment_method,
        COUNT(*) as count,
        SUM(amount) as total
      FROM payments
      WHERE status = 'completed' AND ${dateFilter}
      GROUP BY payment_method
    `);

    const [topProducts] = await connection.execute(`
      SELECT 
        product_type,
        COUNT(*) as sales_count,
        SUM(amount) as total_revenue
      FROM payments
      WHERE status = 'completed' AND ${dateFilter}
      GROUP BY product_type
      ORDER BY total_revenue DESC
    `);

    connection.release();

    res.json({
      success: true,
      statistics: stats[0],
      paymentMethods,
      topProducts,
      period
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Download Receipt
 * GET /api/payments/:paymentId/receipt
 */
exports.downloadReceipt = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const connection = await pool.getConnection();

    const [payments] = await connection.execute(
      'SELECT p.*, u.email, u.name FROM payments p JOIN users u ON p.user_id = u.id WHERE p.id = ?',
      [paymentId]
    );

    if (!payments.length) {
      connection.release();
      return res.status(404).json({ error: 'Payment not found' });
    }

    const payment = payments[0];

    // Get invoice details
    const [invoices] = await connection.execute(
      'SELECT * FROM invoices WHERE payment_id = ?',
      [paymentId]
    );

    connection.release();

    // Generate PDF receipt
    const doc = new PDFDocument();
    const filename = `receipt_${payment.id}.pdf`;
    const filepath = path.join(__dirname, '../receipts', filename);

    // Create receipts directory if it doesn't exist
    if (!fs.existsSync(path.dirname(filepath))) {
      fs.mkdirSync(path.dirname(filepath), { recursive: true });
    }

    doc.pipe(fs.createWriteStream(filepath));

    // Header
    doc.fontSize(20).text('Payment Receipt', { align: 'center' });
    doc.fontSize(12).text('ctechrnd.com', { align: 'center' });
    doc.moveDown();

    // Receipt details
    doc.fontSize(10);
    doc.text(`Invoice Number: ${invoices[0]?.invoice_number || 'N/A'}`);
    doc.text(`Transaction ID: ${payment.transaction_id}`);
    doc.text(`Date: ${new Date(payment.created_at).toLocaleDateString()}`);
    doc.moveDown();

    // Customer details
    doc.text('Bill To:');
    doc.text(`Name: ${payment.name}`);
    doc.text(`Email: ${payment.email}`);
    doc.moveDown();

    // Items
    doc.text('Description: Subscription/Product Purchase');
    doc.text(`Amount: ₹${payment.amount.toFixed(2)}`);
    doc.text(`Currency: ${payment.currency.toUpperCase()}`);
    doc.text(`Status: ${payment.status}`);
    doc.moveDown();

    // Total
    doc.fontSize(12).text(`Total: ₹${payment.amount.toFixed(2)}`, { align: 'right' });
    doc.moveDown(2);

    // Footer
    doc.fontSize(8).text('Thank you for your purchase!', { align: 'center' });
    doc.text('For questions, contact: support@ctechrnd.com', { align: 'center' });

    doc.end();

    // Send file
    res.contentType('application/pdf');
    res.download(filepath, filename);
  } catch (error) {
    console.error('Error generating receipt:', error);
    res.status(400).json({ error: error.message });
  }
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

async function handlePaymentIntentSucceeded(paymentIntent, connection) {
  await connection.execute(
    'UPDATE payments SET status = ? WHERE stripe_payment_intent_id = ?',
    ['completed', paymentIntent.id]
  );
}

async function handlePaymentIntentFailed(paymentIntent, connection) {
  await connection.execute(
    'UPDATE payments SET status = ? WHERE stripe_payment_intent_id = ?',
    ['failed', paymentIntent.id]
  );
}

async function handleChargeRefunded(charge, connection) {
  const [payments] = await connection.execute(
    'SELECT id FROM payments WHERE stripe_payment_intent_id = ?',
    [charge.payment_intent]
  );

  if (payments.length) {
    await connection.execute(
      'UPDATE payments SET status = ? WHERE id = ?',
      ['refunded', payments[0].id]
    );
  }
}

async function handleInvoicePaid(invoice, connection) {
  // Handle invoice payment confirmation
  console.log('Invoice paid:', invoice.id);
}

async function handleSubscriptionCancelled(subscription, connection) {
  await connection.execute(
    'UPDATE subscriptions SET status = ? WHERE stripe_subscription_id = ?',
    ['cancelled', subscription.id]
  );
}

async function sendPaymentConfirmationEmail(userId, payment, invoiceNumber, paymentIntent) {
  try {
    const connection = await pool.getConnection();
    const [users] = await connection.execute(
      'SELECT email, name FROM users WHERE id = ?',
      [userId]
    );
    connection.release();

    if (!users.length) return;

    const user = users[0];
    const amount = payment.amount.toFixed(2);
    const date = new Date(payment.created_at).toLocaleDateString();

    const htmlTemplate = `
      <h1>Payment Confirmation</h1>
      <p>Dear ${user.name},</p>
      <p>Thank you for your payment! Your transaction has been completed successfully.</p>
      
      <h2>Payment Details</h2>
      <ul>
        <li><strong>Amount:</strong> ₹${amount}</li>
        <li><strong>Transaction ID:</strong> ${payment.transaction_id}</li>
        <li><strong>Invoice Number:</strong> ${invoiceNumber}</li>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Status:</strong> Completed</li>
      </ul>
      
      <h2>What's Next?</h2>
      <p>Your access has been activated. You can now:</p>
      <ul>
        <li>Access all premium content</li>
        <li>Download concept books and research papers</li>
        <li>View your subscription details in your account</li>
      </ul>
      
      <p><a href="https://www.ctechrnd.com/my-account" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View My Account</a></p>
      
      <p>If you have any questions, contact us at <strong>support@ctechrnd.com</strong></p>
      
      <hr>
      <p><small>© 2024 ctechrnd.com. All rights reserved.</small></p>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: user.email,
      subject: `Payment Confirmation - Invoice #${invoiceNumber}`,
      html: htmlTemplate
    });

    console.log(`Payment confirmation email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

function determinePlanName(amount) {
  if (amount <= 500) return 'basic';
  if (amount <= 1500) return 'professional';
  return 'research';
}

function generateInvoiceNumber() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `INV-${new Date().getFullYear()}-${random}`;
}

async function logPaymentEvent(action, source, transactionId, metadata) {
  try {
    const connection = await pool.getConnection();
    
    await connection.execute(
      `INSERT INTO payment_logs (action, source, transaction_id, metadata) 
      VALUES (?, ?, ?, ?)`,
      [action, source, transactionId, JSON.stringify(metadata)]
    );
    
    connection.release();
  } catch (error) {
    console.error('Error logging payment event:', error);
  }
}

module.exports = exports;
