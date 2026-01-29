#!/bin/bash

# ================================================
# Payment System Integration Script
# For ctechrnd.com
# ================================================

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}================================================${NC}"
echo -e "${YELLOW}Payment System Integration Setup${NC}"
echo -e "${YELLOW}ctechrnd.com${NC}"
echo -e "${YELLOW}================================================${NC}"
echo ""

# Check if running from correct directory
if [ ! -f "website/backend/server.js" ]; then
    echo -e "${RED}❌ Error: server.js not found. Run this script from the project root.${NC}"
    exit 1
fi

# Step 1: Install dependencies
echo -e "${YELLOW}📦 Step 1: Installing dependencies...${NC}"
cd website/backend

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found. Please install Node.js first.${NC}"
    exit 1
fi

echo "Installing Stripe..."
npm install stripe --save

echo "Installing PayPal SDK..."
npm install @paypal/checkout-server-sdk --save

echo "Installing additional packages..."
npm install nodemailer --save
npm install pdfkit --save
npm install qrcode --save
npm install mysql2 --save

cd ../..

echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# Step 2: Create controllers directory if it doesn't exist
echo -e "${YELLOW}📁 Step 2: Checking controller directory...${NC}"
if [ ! -d "website/backend/controllers" ]; then
    mkdir -p website/backend/controllers
    echo -e "${GREEN}✅ Created controllers directory${NC}"
else
    echo -e "${GREEN}✅ Controllers directory exists${NC}"
fi

# Step 3: Create routes directory if it doesn't exist
echo -e "${YELLOW}📁 Step 3: Checking routes directory...${NC}"
if [ ! -d "website/backend/routes" ]; then
    mkdir -p website/backend/routes
    echo -e "${GREEN}✅ Created routes directory${NC}"
else
    echo -e "${GREEN}✅ Routes directory exists${NC}"
fi

# Step 4: Create middleware directory if it doesn't exist
echo -e "${YELLOW}📁 Step 4: Checking middleware directory...${NC}"
if [ ! -d "website/backend/middleware" ]; then
    mkdir -p website/backend/middleware
    echo -e "${GREEN}✅ Created middleware directory${NC}"
else
    echo -e "${GREEN}✅ Middleware directory exists${NC}"
fi

# Step 5: Create config directory if it doesn't exist
echo -e "${YELLOW}📁 Step 5: Checking config directory...${NC}"
if [ ! -d "website/backend/config" ]; then
    mkdir -p website/backend/config
    echo -e "${GREEN}✅ Created config directory${NC}"
else
    echo -e "${GREEN}✅ Config directory exists${NC}"
fi

# Step 6: Create .env file template
echo -e "${YELLOW}🔐 Step 6: Creating .env template...${NC}"
if [ ! -f "website/backend/.env" ]; then
    cat > website/backend/.env << 'EOF'
# ==========================================
# SERVER CONFIGURATION
# ==========================================
NODE_ENV=development
PORT=5000
API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
SECRET_KEY=your-secret-key-here-min-32-chars

# ==========================================
# DATABASE CONFIGURATION
# ==========================================
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your-password
DB_NAME=ctechr_database
DB_PORT=3306

# ==========================================
# STRIPE CONFIGURATION (Get from https://stripe.com)
# ==========================================
STRIPE_PUBLIC_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_test_YOUR_SECRET_HERE

# ==========================================
# PAYPAL CONFIGURATION (Get from https://developer.paypal.com)
# ==========================================
PAYPAL_CLIENT_ID=YOUR_CLIENT_ID_HERE
PAYPAL_CLIENT_SECRET=YOUR_CLIENT_SECRET_HERE
PAYPAL_MODE=sandbox

# ==========================================
# EMAIL CONFIGURATION
# ==========================================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
SMTP_FROM=noreply@ctechrnd.com

# ==========================================
# OTHER SETTINGS
# ==========================================
JWT_SECRET=your-jwt-secret-key-here-min-32-chars
DEFAULT_CURRENCY=INR
TAX_PERCENTAGE=18
ENABLE_STRIPE_PAYMENTS=true
ENABLE_PAYPAL_DONATIONS=true
EOF
    echo -e "${YELLOW}⚠️  .env file created. Please add your credentials!${NC}"
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi

# Step 7: Create authentication middleware
echo -e "${YELLOW}🔐 Step 7: Setting up authentication middleware...${NC}"
if [ ! -f "website/backend/middleware/auth.js" ]; then
    cat > website/backend/middleware/auth.js << 'EOF'
/**
 * Authentication Middleware
 */

exports.authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // TODO: Verify JWT token
    // For now, just pass through in development
    req.userId = req.body.userId || 1;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
EOF
    echo -e "${GREEN}✅ Authentication middleware created${NC}"
else
    echo -e "${GREEN}✅ Authentication middleware exists${NC}"
fi

# Step 8: Create database configuration
echo -e "${YELLOW}🗄️  Step 8: Setting up database configuration...${NC}"
if [ ! -f "website/backend/config/database.js" ]; then
    cat > website/backend/config/database.js << 'EOF'
/**
 * Database Configuration
 */

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ctechr_database',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
EOF
    echo -e "${GREEN}✅ Database configuration created${NC}"
else
    echo -e "${GREEN}✅ Database configuration exists${NC}"
fi

# Step 9: Display integration instructions
echo ""
echo -e "${YELLOW}================================================${NC}"
echo -e "${GREEN}✅ Integration Setup Complete!${NC}"
echo -e "${YELLOW}================================================${NC}"
echo ""

echo -e "${YELLOW}📋 Next Steps:${NC}"
echo ""
echo -e "${YELLOW}1. Add credentials to .env file:${NC}"
echo "   - Stripe keys (get from https://stripe.com)"
echo "   - PayPal credentials (get from https://developer.paypal.com)"
echo "   - Email service credentials (Gmail App Password)"
echo ""

echo -e "${YELLOW}2. Create database tables:${NC}"
echo "   mysql -u root -p ctechr_database < database/payments_schema.sql"
echo ""

echo -e "${YELLOW}3. Add to your server.js file:${NC}"
echo "   const paymentRoutes = require('./routes/paymentRoutes');"
echo "   const donationRoutes = require('./routes/donationRoutes');"
echo "   app.use('/api/payments', paymentRoutes);"
echo "   app.use('/api/donations', donationRoutes);"
echo ""

echo -e "${YELLOW}4. Test the endpoints:${NC}"
echo "   curl -X GET http://localhost:5000/api/payments/stats"
echo "   curl -X GET http://localhost:5000/api/donations/summary"
echo ""

echo -e "${YELLOW}5. Read the documentation:${NC}"
echo "   - PAYMENT_GUIDE.md (implementation details)"
echo "   - QUICK_REFERENCE.md (quick commands)"
echo "   - ENV-CONFIGURATION.md (environment setup)"
echo ""

echo -e "${GREEN}📚 Documentation files:${NC}"
echo "   - ARCHITECTURE.md (system design - 8000+ lines)"
echo "   - PAYMENT_GUIDE.md (setup & usage)"
echo "   - ENV-CONFIGURATION.md (env variables)"
echo "   - QUICK_REFERENCE.md (quick lookup)"
echo "   - PAYMENT_IMPLEMENTATION_STATUS.md (progress tracking)"
echo ""

echo -e "${YELLOW}================================================${NC}"
echo -e "${GREEN}Ready to integrate! Good luck! 🚀${NC}"
echo -e "${YELLOW}================================================${NC}"
