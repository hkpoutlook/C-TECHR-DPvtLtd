/**
 * Donation Controller for ctechrnd.com
 * Handles PayPal donation processing and donation management
 */

const paypal = require('@paypal/checkout-server-sdk');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');
const QRCode = require('qrcode');

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

// PayPal client configuration
let environment = process.env.PAYPAL_MODE === 'live'
  ? new paypal.core.LiveEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET)
  : new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);

let client = new paypal.core.PayPalHttpClient(environment);

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
 * Create Donation (PayPal Order)
 * POST /api/donations/create
 */
exports.createDonation = async (req, res) => {
  try {
    const { amount, donorName, donorEmail, message, anonymous = false, paymentMethod = 'paypal', currencyCode = 'INR' } = req.body;

    // Validation
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid donation amount' });
    }

    if (!donorName || !donorEmail) {
      return res.status(400).json({ error: 'Donor name and email are required' });
    }

    const connection = await pool.getConnection();

    if (paymentMethod === 'paypal') {
      try {
        // Create PayPal Order
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer('return=representation');
        request.requestBody({
          intent: 'CAPTURE',
          purchase_units: [{
            amount: {
              currency_code: currencyCode,
              value: amount.toString()
            },
            description: 'Donation to ctechrnd.com - Supporting Research & Education'
          }],
          payer: {
            name: {
              given_name: donorName.split(' ')[0],
              surname: donorName.split(' ').slice(1).join(' ') || 'Donor'
            },
            email_address: donorEmail
          }
        });

        const response = await client.execute(request);

        // Save donation record with PayPal order ID
        const donationId = await saveDonationRecord(
          connection,
          donorName,
          donorEmail,
          amount,
          currencyCode,
          'paypal',
          'pending',
          response.result.id,
          null,
          null,
          message,
          anonymous
        );

        // Find approval URL
        const approvalUrl = response.result.links.find(link => link.rel === 'approve')?.href;

        connection.release();

        res.json({
          success: true,
          orderId: response.result.id,
          donationId,
          approvalUrl,
          amount,
          currency: currencyCode
        });
      } catch (error) {
        connection.release();
        console.error('PayPal order creation error:', error);
        res.status(400).json({ error: 'Failed to create PayPal order: ' + error.message });
      }
    } else if (paymentMethod === 'stripe') {
      try {
        // Create Stripe charge
        const charge = await stripe.charges.create({
          amount: Math.round(amount * 100),
          currency: currencyCode.toLowerCase(),
          source: req.body.stripeToken,
          description: `Donation from ${donorName}`,
          metadata: {
            donorName,
            message,
            anonymous
          },
          receipt_email: donorEmail
        });

        // Save donation record with Stripe charge ID
        const donationId = await saveDonationRecord(
          connection,
          donorName,
          donorEmail,
          amount,
          currencyCode,
          'stripe',
          'completed',
          null,
          charge.id,
          null,
          message,
          anonymous
        );

        connection.release();

        // Send thank you email immediately
        await sendDonationThankYouEmail(donationId, donorName, donorEmail, amount, anonymous);

        res.json({
          success: true,
          donationId,
          amount,
          status: 'completed',
          message: 'Thank you for your donation!'
        });
      } catch (error) {
        connection.release();
        console.error('Stripe donation error:', error);
        res.status(400).json({ error: 'Failed to process donation: ' + error.message });
      }
    } else {
      connection.release();
      res.status(400).json({ error: 'Invalid payment method' });
    }
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Capture PayPal Donation
 * POST /api/donations/capture
 */
exports.captureDonation = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    const connection = await pool.getConnection();

    // Create capture request
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    const response = await client.execute(request);

    if (response.result.status === 'COMPLETED') {
      const paypalTransactionId = response.result.purchase_units[0].payments.captures[0].id;
      const amount = parseFloat(response.result.purchase_units[0].amount.value);

      // Update donation status
      const [donations] = await connection.execute(
        'SELECT * FROM donations WHERE paypal_order_id = ?',
        [orderId]
      );

      if (donations.length) {
        const donation = donations[0];

        await connection.execute(
          'UPDATE donations SET status = ?, transaction_id = ?, updated_at = NOW() WHERE paypal_order_id = ?',
          ['completed', paypalTransactionId, orderId]
        );

        // Send thank you email
        await sendDonationThankYouEmail(
          donation.id,
          donation.donor_name,
          donation.donor_email,
          donation.amount,
          donation.anonymous
        );

        // Log event
        logDonationEvent('donation_captured', 'paypal', paypalTransactionId, {
          orderId,
          amount,
          donorEmail: donation.donor_email
        });

        connection.release();

        res.json({
          success: true,
          donationId: donation.id,
          transactionId: paypalTransactionId,
          status: 'completed',
          amount
        });
      } else {
        connection.release();
        res.status(404).json({ error: 'Donation not found' });
      }
    } else {
      connection.release();
      res.status(400).json({ error: 'Payment not completed', status: response.result.status });
    }
  } catch (error) {
    console.error('Error capturing donation:', error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get Donation Summary
 * GET /api/donations/summary
 */
exports.getDonationSummary = async (req, res) => {
  try {
    const connection = await pool.getConnection();

    const [summary] = await connection.execute(`
      SELECT 
        COUNT(*) as totalDonations,
        SUM(amount) as totalAmount,
        ROUND(AVG(amount), 2) as averageDonation,
        MAX(amount) as largestDonation,
        COUNT(DISTINCT donor_email) as uniqueDonors,
        COUNT(CASE WHEN anonymous = false THEN 1 END) as publicDonations
      FROM donations 
      WHERE status = 'completed'
    `);

    connection.release();

    res.json({
      success: true,
      summary: summary[0]
    });
  } catch (error) {
    console.error('Error fetching donation summary:', error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get Donation Leaderboard
 * GET /api/donations/leaderboard
 */
exports.getDonationLeaderboard = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const connection = await pool.getConnection();

    const [leaderboard] = await connection.execute(`
      SELECT 
        donor_name,
        SUM(amount) as totalDonated,
        COUNT(*) as donationCount,
        MAX(created_at) as lastDonationDate
      FROM donations 
      WHERE status = 'completed' AND anonymous = false
      GROUP BY donor_email
      ORDER BY totalDonated DESC
      LIMIT ?
    `, [parseInt(limit)]);

    connection.release();

    res.json({
      success: true,
      leaderboard
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get Donation Statistics
 * GET /api/donations/statistics
 */
exports.getDonationStatistics = async (req, res) => {
  try {
    const { period = 'month' } = req.query;

    const connection = await pool.getConnection();

    let dateFilter = 'DATE(created_at) = CURDATE()';
    if (period === 'week') {
      dateFilter = 'WEEK(created_at) = WEEK(CURDATE())';
    } else if (period === 'month') {
      dateFilter = 'MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())';
    } else if (period === 'year') {
      dateFilter = 'YEAR(created_at) = YEAR(CURDATE())';
    }

    const [monthlyStats] = await connection.execute(`
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m-%d') as date,
        COUNT(*) as donationCount,
        SUM(amount) as totalAmount,
        ROUND(AVG(amount), 2) as averageAmount
      FROM donations
      WHERE status = 'completed' AND ${dateFilter}
      GROUP BY DATE_FORMAT(created_at, '%Y-%m-%d')
      ORDER BY date DESC
    `);

    const [paymentMethodStats] = await connection.execute(`
      SELECT 
        payment_method,
        COUNT(*) as count,
        SUM(amount) as total,
        ROUND(AVG(amount), 2) as average
      FROM donations
      WHERE status = 'completed' AND ${dateFilter}
      GROUP BY payment_method
    `);

    connection.release();

    res.json({
      success: true,
      statistics: {
        period,
        dailyStats: monthlyStats,
        paymentMethods: paymentMethodStats
      }
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get User Donations
 * GET /api/donations/user/:userId
 */
exports.getUserDonations = async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 10, offset = 0 } = req.query;

    const connection = await pool.getConnection();

    const [donations] = await connection.execute(
      `SELECT 
        id, amount, status, created_at, message
      FROM donations 
      WHERE user_id = ? AND status = 'completed'
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?`,
      [userId, parseInt(limit), parseInt(offset)]
    );

    const [totalResult] = await connection.execute(
      'SELECT SUM(amount) as totalDonated FROM donations WHERE user_id = ? AND status = ?',
      [userId, 'completed']
    );

    connection.release();

    res.json({
      success: true,
      donations,
      totalDonated: totalResult[0]?.totalDonated || 0,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (error) {
    console.error('Error fetching user donations:', error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Create Recurring Donation
 * POST /api/donations/recurring/create
 */
exports.createRecurringDonation = async (req, res) => {
  try {
    const { 
      amount, 
      donorName, 
      donorEmail, 
      frequency = 'monthly', 
      paymentMethod = 'stripe' 
    } = req.body;

    // Validation
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const connection = await pool.getConnection();

    if (paymentMethod === 'stripe') {
      // Create Stripe subscription
      const customer = await stripe.customers.create({
        email: donorEmail,
        name: donorName,
        metadata: {
          donorType: 'recurring_donor'
        }
      });

      const priceData = {
        unit_amount: Math.round(amount * 100),
        currency: 'inr',
        recurring: {
          interval: frequency === 'monthly' ? 'month' : frequency === 'quarterly' ? '3 months' : 'year',
          interval_count: frequency === 'quarterly' ? 3 : 1
        },
        product_data: {
          name: 'ctechrnd.com - Recurring Donation',
          description: `Recurring donation - ${frequency}`
        }
      };

      const price = await stripe.prices.create(priceData);

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: price.id }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent']
      });

      // Save to database
      await connection.execute(
        `INSERT INTO subscriptions 
        (user_id, plan_id, plan_name, status, stripe_subscription_id, amount, billing_cycle, start_date, payment_method)
        VALUES (NULL, ?, ?, ?, ?, ?, ?, NOW(), ?)`,
        [`recurring_donation_${customer.id}`, 'recurring_donation', 'active', subscription.id, amount, frequency, 'stripe']
      );

      connection.release();

      res.json({
        success: true,
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        customerId: customer.id
      });
    } else {
      connection.release();
      res.status(400).json({ error: 'PayPal recurring donations not yet implemented' });
    }
  } catch (error) {
    console.error('Error creating recurring donation:', error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Cancel Recurring Donation
 * POST /api/donations/recurring/:subscriptionId/cancel
 */
exports.cancelRecurringDonation = async (req, res) => {
  try {
    const { subscriptionId } = req.params;

    const connection = await pool.getConnection();

    // Get subscription from database
    const [subscriptions] = await connection.execute(
      'SELECT * FROM subscriptions WHERE stripe_subscription_id = ?',
      [subscriptionId]
    );

    if (!subscriptions.length) {
      connection.release();
      return res.status(404).json({ error: 'Subscription not found' });
    }

    // Cancel with Stripe
    await stripe.subscriptions.del(subscriptionId);

    // Update database
    await connection.execute(
      'UPDATE subscriptions SET status = ?, updated_at = NOW() WHERE stripe_subscription_id = ?',
      ['cancelled', subscriptionId]
    );

    connection.release();

    res.json({
      success: true,
      message: 'Recurring donation cancelled'
    });
  } catch (error) {
    console.error('Error cancelling recurring donation:', error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Generate Donation Receipt
 * GET /api/donations/:donationId/receipt
 */
exports.generateReceipt = async (req, res) => {
  try {
    const { donationId } = req.params;

    const connection = await pool.getConnection();

    const [donations] = await connection.execute(
      'SELECT * FROM donations WHERE id = ?',
      [donationId]
    );

    connection.release();

    if (!donations.length) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    const donation = donations[0];

    // Generate QR code
    const qrCodeUrl = await QRCode.toDataURL(
      `https://www.ctechrnd.com/donations/${donationId}`
    );

    const htmlReceipt = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Donation Receipt</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 20px; }
          .content { margin: 20px 0; }
          .footer { text-align: center; color: #666; font-size: 12px; }
          table { width: 100%; border-collapse: collapse; }
          td { padding: 8px; border: 1px solid #ddd; }
          .qr-code { text-align: center; margin: 20px 0; }
          .qr-code img { width: 150px; height: 150px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Donation Receipt</h1>
          <p>ctechrnd.com</p>
        </div>
        
        <div class="content">
          <h2>Thank You for Your Generosity!</h2>
          
          <table>
            <tr>
              <td><strong>Receipt Number</strong></td>
              <td>RCP-${donationId}</td>
            </tr>
            <tr>
              <td><strong>Date</strong></td>
              <td>${new Date(donation.created_at).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td><strong>Donor Name</strong></td>
              <td>${donation.anonymous ? 'Anonymous Donor' : donation.donor_name}</td>
            </tr>
            <tr>
              <td><strong>Amount</strong></td>
              <td>₹${donation.amount.toFixed(2)}</td>
            </tr>
            <tr>
              <td><strong>Payment Method</strong></td>
              <td>${donation.payment_method.toUpperCase()}</td>
            </tr>
            <tr>
              <td><strong>Status</strong></td>
              <td>${donation.status}</td>
            </tr>
            ${donation.message ? `<tr><td colspan="2"><strong>Message:</strong> ${donation.message}</td></tr>` : ''}
          </table>
          
          <div class="qr-code">
            <p>Verify Donation:</p>
            <img src="${qrCodeUrl}" alt="QR Code">
          </div>
          
          <p>This donation supports our research and educational initiatives at ctechrnd.com. 
          Your contribution helps us continue our mission to advance knowledge and innovation.</p>
          
          ${donation.tax_deductible ? '<p><strong>Tax Deductible:</strong> This donation may be tax deductible. Please consult with your tax advisor.</p>' : ''}
        </div>
        
        <div class="footer">
          <p>For questions about your donation, please contact: support@ctechrnd.com</p>
          <p>© 2024 C-TECHR Pvt Ltd. All rights reserved.</p>
        </div>
      </body>
      </html>
    `;

    res.contentType('text/html');
    res.send(htmlReceipt);
  } catch (error) {
    console.error('Error generating receipt:', error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Handle Donation Webhook (PayPal)
 * POST /api/donations/webhook
 */
exports.handleWebhook = async (req, res) => {
  try {
    const { id: eventId, event_type, resource } = req.body;

    const connection = await pool.getConnection();

    // Store webhook event
    await connection.execute(
      `INSERT INTO payment_events 
      (event_id, event_type, source, payload, status)
      VALUES (?, ?, 'paypal', ?, 'received')`,
      [eventId, event_type, JSON.stringify(req.body)]
    );

    switch (event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        // Update donation status to completed
        if (resource.supplementary_data?.related_ids?.order_id) {
          await connection.execute(
            'UPDATE donations SET status = ?, transaction_id = ?, updated_at = NOW() WHERE paypal_order_id = ?',
            ['completed', resource.id, resource.supplementary_data.related_ids.order_id]
          );
        }
        break;

      case 'PAYMENT.CAPTURE.REFUNDED':
        // Handle refund
        await connection.execute(
          'UPDATE donations SET status = ?, updated_at = NOW() WHERE paypal_order_id = ?',
          ['refunded', resource.supplementary_data?.related_ids?.order_id]
        );
        break;
    }

    // Update event status
    await connection.execute(
      `UPDATE payment_events SET status = 'processed', processed_at = NOW() WHERE event_id = ?`,
      [eventId]
    );

    connection.release();

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.json({ received: true, error: error.message });
  }
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

async function saveDonationRecord(
  connection,
  donorName,
  donorEmail,
  amount,
  currency,
  paymentMethod,
  status,
  paypalOrderId,
  stripeChargeId,
  transactionId,
  message,
  anonymous
) {
  const [result] = await connection.execute(
    `INSERT INTO donations 
    (donor_name, donor_email, amount, currency, payment_method, status, paypal_order_id, stripe_charge_id, transaction_id, message, anonymous, tax_deductible)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, true)`,
    [donorName, donorEmail, amount, currency, paymentMethod, status, paypalOrderId, stripeChargeId, transactionId, message, anonymous]
  );

  return result.insertId;
}

async function sendDonationThankYouEmail(donationId, donorName, donorEmail, amount, anonymous) {
  try {
    const htmlTemplate = `
      <h1>Thank You for Your Donation!</h1>
      <p>Dear ${donorName.split(' ')[0]},</p>
      <p>We deeply appreciate your generous donation of <strong>₹${amount.toFixed(2)}</strong> to ctechrnd.com.</p>
      
      <h2>Your Support Matters</h2>
      <p>Your contribution will directly support:</p>
      <ul>
        <li>Advanced research initiatives</li>
        <li>Educational content development</li>
        <li>Technology infrastructure</li>
        <li>Community outreach programs</li>
      </ul>
      
      <h2>Donation Details</h2>
      <ul>
        <li><strong>Receipt Number:</strong> RCP-${donationId}</li>
        <li><strong>Amount:</strong> ₹${amount.toFixed(2)}</li>
        <li><strong>Date:</strong> ${new Date().toLocaleDateString()}</li>
        <li><strong>Status:</strong> Completed</li>
      </ul>
      
      <p><a href="https://www.ctechrnd.com/donations/${donationId}/receipt" style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Download Receipt</a></p>
      
      <p>If you wish to make a recurring donation or need any information, please contact us at <strong>support@ctechrnd.com</strong></p>
      
      <hr>
      <p><small>© 2024 ctechrnd.com. All rights reserved.</small></p>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: donorEmail,
      subject: 'Thank You for Your Donation to ctechrnd.com',
      html: htmlTemplate
    });

    console.log(`Donation thank you email sent to ${donorEmail}`);
  } catch (error) {
    console.error('Error sending thank you email:', error);
  }
}

function logDonationEvent(action, source, transactionId, metadata) {
  try {
    const connection = pool.getConnection();
    
    connection.execute(
      `INSERT INTO payment_logs (action, source, transaction_id, metadata) 
      VALUES (?, ?, ?, ?)`,
      [action, source, transactionId, JSON.stringify(metadata)]
    );
  } catch (error) {
    console.error('Error logging donation event:', error);
  }
}

module.exports = exports;
