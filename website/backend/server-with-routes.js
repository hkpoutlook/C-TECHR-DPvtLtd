/**
 * API Configuration & Routes
 * ctechrnd.com Backend
 */

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// ==========================================
// MIDDLEWARE CONFIGURATION
// ==========================================

// CORS Configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body Parser
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Request Logging Middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ==========================================
// API ROUTES - MOUNT HERE
// ==========================================

/**
 * AUTHENTICATION ROUTES
 * POST /auth/login
 * POST /auth/signup
 * POST /auth/logout
 * GET  /auth/verify
 */
// const authRoutes = require('./routes/authRoutes');
// app.use('/auth', authRoutes);

/**
 * PAYMENT ROUTES
 * POST /api/payments/create-intent
 * POST /api/payments/confirm
 * GET  /api/payments/history/:userId
 * GET  /api/payments/:paymentId
 * POST /api/payments/:paymentId/refund
 * GET  /api/payments/stats
 * GET  /api/payments/:paymentId/receipt
 * POST /api/payments/webhook
 */
const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payments', paymentRoutes);

/**
 * DONATION ROUTES
 * POST /api/donations/create
 * POST /api/donations/capture
 * GET  /api/donations/summary
 * GET  /api/donations/leaderboard
 * GET  /api/donations/statistics
 * GET  /api/donations/user/:userId
 * GET  /api/donations/:donationId/receipt
 * POST /api/donations/recurring/create
 * POST /api/donations/recurring/:subscriptionId/cancel
 * POST /api/donations/webhook
 */
const donationRoutes = require('./routes/donationRoutes');
app.use('/api/donations', donationRoutes);

/**
 * CONTENT ROUTES
 * GET /api/concept-books
 * GET /api/concept-books/:id
 * GET /api/products
 * GET /api/products/:id
 * GET /api/research
 * GET /api/research/:id
 */
// const contentRoutes = require('./routes/contentRoutes');
// app.use('/api', contentRoutes);

/**
 * USER ROUTES
 * POST /api/users/register
 * POST /api/users/login
 * GET  /api/users/:userId
 * PUT  /api/users/:userId
 * DELETE /api/users/:userId
 */
// const userRoutes = require('./routes/userRoutes');
// app.use('/api/users', userRoutes);

// ==========================================
// HEALTH CHECK ROUTES
// ==========================================

/**
 * Health check endpoint
 * GET /health
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

/**
 * API status endpoint
 * GET /api/status
 */
app.get('/api/status', (req, res) => {
  res.json({
    api: 'ctechrnd.com',
    version: '1.0',
    status: 'running',
    endpoints: {
      payments: '/api/payments',
      donations: '/api/donations',
      auth: '/auth',
      users: '/api/users',
      content: '/api/content'
    }
  });
});

// ==========================================
// ERROR HANDLING MIDDLEWARE
// ==========================================

/**
 * 404 Not Found Handler
 */
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString()
  });
});

/**
 * Global Error Handler
 */
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  res.status(err.status || 500).json({
    error: err.name || 'Internal Server Error',
    message: err.message,
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ==========================================
// SERVER STARTUP
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  ctechrnd.com API Server              ║
║  Version: 1.0                          ║
╠════════════════════════════════════════╣
║  Server running on port ${PORT}         ║
║  Environment: ${process.env.NODE_ENV || 'development'}  ║
║  Database: ${process.env.DB_HOST}              ║
╠════════════════════════════════════════╣
║  Available Routes:                     ║
║  ✓ POST   /api/payments/create-intent  ║
║  ✓ GET    /api/payments/stats          ║
║  ✓ POST   /api/donations/create        ║
║  ✓ GET    /api/donations/summary       ║
║  ✓ GET    /health                      ║
║  ✓ GET    /api/status                  ║
╚════════════════════════════════════════╝
  `);
});

module.exports = app;
