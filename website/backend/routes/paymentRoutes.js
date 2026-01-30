/**
 * Payment Routes for ctechrnd.com
 * Handles all payment-related API endpoints
 */

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authenticate } = require('../middleware/auth');

/**
 * Payment Intent Routes
 */

// Create payment intent
router.post('/create-intent', paymentController.createPaymentIntent);

// Confirm payment
router.post('/confirm', authenticate, paymentController.confirmPayment);

// Get payment history
router.get('/history/:userId', authenticate, paymentController.getPaymentHistory);

// Get payment details
router.get('/:paymentIntentId', authenticate, paymentController.getPaymentDetails);

// Refund payment
router.post('/:paymentId/refund', authenticate, paymentController.refundPayment);

// Get payment statistics
router.get('/stats', paymentController.getPaymentStatistics);

// Download receipt
router.get('/:paymentId/receipt', paymentController.downloadReceipt);

/**
 * Webhook Routes
 */

// Stripe webhook
router.post('/webhook', express.raw({type: 'application/json'}), paymentController.handleWebhook);

module.exports = router;
