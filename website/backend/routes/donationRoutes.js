/**
 * Donation Routes for ctechrnd.com
 * Handles all donation-related API endpoints
 */

const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const { authenticate } = require('../middleware/auth');

/**
 * Donation Routes
 */

// Create donation (PayPal or Stripe)
router.post('/create', donationController.createDonation);

// Capture PayPal donation
router.post('/capture', donationController.captureDonation);

// Get donation summary (public)
router.get('/summary', donationController.getDonationSummary);

// Get donation leaderboard (public)
router.get('/leaderboard', donationController.getDonationLeaderboard);

// Get donation statistics
router.get('/statistics', donationController.getDonationStatistics);

// Get user's donations
router.get('/user/:userId', donationController.getUserDonations);

// Generate donation receipt
router.get('/:donationId/receipt', donationController.generateReceipt);

/**
 * Recurring Donation Routes
 */

// Create recurring donation
router.post('/recurring/create', donationController.createRecurringDonation);

// Cancel recurring donation
router.post('/recurring/:subscriptionId/cancel', authenticate, donationController.cancelRecurringDonation);

/**
 * Webhook Routes
 */

// PayPal webhook
router.post('/webhook', donationController.handleWebhook);

module.exports = router;
