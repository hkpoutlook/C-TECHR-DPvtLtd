/**
 * Authentication Middleware
 * Verifies JWT tokens
 */

const authenticate = (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];

    // For now, just pass through in development
    // In production, verify JWT token here
    if (token) {
      req.userId = 'user123'; // Placeholder user ID
      req.isAuthenticated = true;
    } else {
      req.isAuthenticated = false;
    }

    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = { authenticate };
