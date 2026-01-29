# C-TECH R&D Website - Complete Architecture
## 🏗️ System Design & Technical Structure

---

## 📋 Table of Contents
1. [System Overview](#system-overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Technology Stack](#technology-stack)
4. [Directory Structure](#directory-structure)
5. [Component Architecture](#component-architecture)
6. [Database Design](#database-design)
7. [API Architecture](#api-architecture)
8. [Payment & Donation System](#payment--donation-system)
9. [Data Flow](#data-flow)
10. [Security Architecture](#security-architecture)

---

## 🎯 System Overview

### Vision
A comprehensive platform for research and instrumentation solutions with three integrated content categories, supporting educational, professional, and research-level users with full payment and donation capabilities.

### Core Features
- **Multi-tier Content Library** (Free, Professional, Research)
- **Product Catalog** (Foundation, Industrial, Research-level)
- **Payment & Donation System** (Stripe/PayPal integration)
- **User Management** (Authentication, Preferences)
- **Research Repository** (Papers, Projects, Case Studies)
- **Responsive Web Interface** (Mobile, Tablet, Desktop)

---

## 🏛️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER LAYER                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Web Browser (Desktop/Mobile)                                    │
│  ├── React Frontend Application                                  │
│  │   ├── Pages (Home, Library, Products, etc.)                  │
│  │   ├── Components (Navigation, Cards, Forms)                  │
│  │   └── Styles (CSS, Responsive Design)                        │
│  │                                                               │
│  └── Payment Gateway Interface ✨                               │
│      ├── Donation Form                                          │
│      ├── Checkout System (Stripe/PayPal)                        │
│      └── Payment Status Display                                 │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                            ↓ (HTTPS)
┌─────────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Nginx Reverse Proxy                                            │
│  ├── HTTPS/TLS Termination                                      │
│  ├── Load Balancing                                             │
│  ├── Static Asset Caching                                       │
│  └── Compression (Gzip)                                         │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                            ↓ (HTTP)
┌─────────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Express.js REST API Server (Port 5000)                         │
│  ├── Request Handler & Router                                   │
│  │   ├── Content Routes (/api/concept-books, /api/products)    │
│  │   ├── Payment Routes (/api/payments) ✨                      │
│  │   ├── Donation Routes (/api/donations) ✨                    │
│  │   ├── User Routes (/api/users, /api/auth)                   │
│  │   └── Research Routes (/api/research)                        │
│  │                                                               │
│  ├── Business Logic Layer                                       │
│  │   ├── Content Manager                                        │
│  │   ├── Payment Processor (Stripe SDK) ✨                      │
│  │   ├── Donation Processor (PayPal SDK) ✨                     │
│  │   ├── User Manager                                           │
│  │   └── Authorization/Authentication                           │
│  │                                                               │
│  ├── Middleware                                                  │
│  │   ├── CORS Handler                                           │
│  │   ├── Body Parser                                            │
│  │   ├── Error Handler                                          │
│  │   └── Request Validator                                      │
│  │                                                               │
│  └── External Service Integration                               │
│      ├── Stripe API (Payments) ✨                               │
│      ├── PayPal API (Donations) ✨                              │
│      ├── Email Service (Nodemailer)                             │
│      └── Analytics (Google Analytics)                           │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                            ↓ (Queries)
┌─────────────────────────────────────────────────────────────────┐
│                    DATA ACCESS LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  MySQL Database Connection Pool                                 │
│  ├── Query Executor                                             │
│  ├── Transaction Manager                                        │
│  ├── Cache Layer (Redis - Optional)                             │
│  └── Connection Pooling                                         │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  MySQL Database Server                                          │
│  ├── Tables                                                     │
│  │   ├── main_categories                                        │
│  │   ├── concept_books                                          │
│  │   ├── products                                               │
│  │   ├── research_content                                       │
│  │   ├── users                                                  │
│  │   ├── inquiries                                              │
│  │   ├── payments ✨                                            │
│  │   └── donations ✨                                           │
│  │                                                               │
│  ├── Indexes (Performance)                                      │
│  ├── Backups                                                    │
│  └── Replication (Optional)                                     │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend
```
React 18.2                  - UI Framework
React Router 6.20           - Navigation & Routing
Axios 1.6                   - HTTP Client
CSS3                        - Styling & Responsive Design
Stripe.js / PayPal SDK      - Payment Processing ✨
```

### Backend
```
Node.js 16+                 - Runtime Environment
Express.js 4.18             - Web Framework
CORS 2.8                    - Cross-Origin Support
Body Parser 1.20            - Request Parsing
Dotenv 16.3                 - Environment Management
Stripe SDK ✨               - Payment Processing
PayPal SDK ✨               - Donation Processing
Nodemailer                  - Email Notifications
```

### Database
```
MySQL 5.7+                  - Primary Database
Redis (Optional)            - Caching Layer
```

### Deployment & Infrastructure
```
Ubuntu 24.04 LTS            - Server OS
Nginx                       - Reverse Proxy & Web Server
PM2                         - Process Manager
Let's Encrypt               - SSL/TLS Certificates
```

### External Services
```
Stripe ✨                   - Payment Processing
PayPal ✨                   - Alternative Payments
SendGrid/AWS SES            - Email Service
Google Analytics            - Analytics & Tracking
```

---

## 📂 Directory Structure

```
C-TECHR-DPvtLtd/
│
├── website/
│   │
│   ├── frontend/                           # React Application
│   │   ├── public/
│   │   │   └── index.html                  # HTML Entry Point
│   │   │
│   │   ├── src/
│   │   │   ├── index.js                    # React Root
│   │   │   ├── App.js                      # Main App Component
│   │   │   ├── App.css                     # Global Styles
│   │   │   │
│   │   │   ├── components/
│   │   │   │   ├── Header.js               # Navigation Header
│   │   │   │   ├── Footer.js               # Footer Component
│   │   │   │   ├── CategoryView.js         # Content Library ✨
│   │   │   │   ├── PaymentForm.js          # ✨ Payment Form
│   │   │   │   ├── DonationWidget.js       # ✨ Donation Widget
│   │   │   │   └── [other components]
│   │   │   │
│   │   │   ├── pages/
│   │   │   │   ├── Home.js                 # Landing Page
│   │   │   │   ├── About.js                # Company Info
│   │   │   │   ├── Products.js             # Product Listing
│   │   │   │   ├── ConceptBooks.js         # Books Listing
│   │   │   │   ├── PaymentPage.js          # ✨ Payment Page
│   │   │   │   ├── CheckoutPage.js         # ✨ Checkout
│   │   │   │   ├── DonationPage.js         # ✨ Donations
│   │   │   │   ├── Contact.js              # Contact Form
│   │   │   │   └── [other pages]
│   │   │   │
│   │   │   ├── styles/
│   │   │   │   ├── CategoryView.css        # Category Styles
│   │   │   │   ├── PaymentForm.css         # ✨ Payment Styles
│   │   │   │   ├── DonationWidget.css      # ✨ Donation Styles
│   │   │   │   └── [other styles]
│   │   │   │
│   │   │   ├── config/
│   │   │   │   ├── api.js                  # API Configuration
│   │   │   │   ├── stripe.js               # ✨ Stripe Config
│   │   │   │   ├── paypal.js               # ✨ PayPal Config
│   │   │   │   └── constants.js            # Constants
│   │   │   │
│   │   │   └── utils/
│   │   │       ├── axios.js                # Axios Instance
│   │   │       ├── validators.js           # Form Validation
│   │   │       └── formatters.js           # Data Formatting
│   │   │
│   │   ├── .env.development                # Dev Environment
│   │   ├── .env.production                 # Prod Environment
│   │   ├── package.json                    # Dependencies
│   │   └── package-lock.json               # Locked Versions
│   │
│   └── backend/                            # Express Application
│       ├── server.js                       # Main Server File
│       │
│       ├── routes/
│       │   ├── content.js                  # Content Routes
│       │   ├── payments.js                 # ✨ Payment Routes
│       │   ├── donations.js                # ✨ Donation Routes
│       │   ├── users.js                    # User Routes
│       │   └── inquiries.js                # Inquiry Routes
│       │
│       ├── controllers/
│       │   ├── contentController.js        # Content Logic
│       │   ├── paymentController.js        # ✨ Payment Logic
│       │   ├── donationController.js       # ✨ Donation Logic
│       │   └── userController.js           # User Logic
│       │
│       ├── models/
│       │   ├── Payment.js                  # ✨ Payment Model
│       │   ├── Donation.js                 # ✨ Donation Model
│       │   ├── User.js                     # User Model
│       │   └── Content.js                  # Content Model
│       │
│       ├── middleware/
│       │   ├── auth.js                     # Authentication
│       │   ├── errorHandler.js             # Error Handling
│       │   └── validators.js               # Input Validation
│       │
│       ├── config/
│       │   ├── stripe.js                   # ✨ Stripe Config
│       │   ├── paypal.js                   # ✨ PayPal Config
│       │   ├── database.js                 # DB Configuration
│       │   └── email.js                    # Email Configuration
│       │
│       ├── services/
│       │   ├── stripeService.js            # ✨ Stripe Integration
│       │   ├── paypalService.js            # ✨ PayPal Integration
│       │   ├── emailService.js             # Email Service
│       │   └── contentService.js           # Content Service
│       │
│       ├── utils/
│       │   ├── validators.js               # Data Validators
│       │   ├── formatters.js               # Response Formatters
│       │   └── logger.js                   # Logging
│       │
│       ├── .env                            # Environment Variables
│       ├── .env.example                    # Example Environment
│       ├── package.json                    # Dependencies
│       └── package-lock.json               # Locked Versions
│
├── database/
│   ├── schema.sql                          # Database Schema
│   ├── sample_data.sql                     # Sample Data
│   ├── payments_schema.sql                 # ✨ Payment Tables
│   └── migrations/                         # Database Migrations
│
├── docs/
│   ├── ARCHITECTURE.md                     # This File
│   ├── API_REFERENCE.md                    # API Documentation
│   ├── PAYMENT_GUIDE.md                    # ✨ Payment Integration
│   └── DEPLOYMENT_GUIDE.md                 # Deployment Steps
│
├── .env.production                         # Production Env
├── .gitignore                              # Git Ignore Rules
├── DEPLOYMENT.md                           # Deployment Guide
├── URL-REFERENCE.md                        # URL Reference
├── README-NEW.md                           # Updated README
└── README.md                               # Original README
```

---

## 💳 Payment & Donation System ✨

### Features

#### Payment System
- **Product Purchases**
  - Professional concept books (₹5,000 - ₹15,000)
  - Industrial products (₹50,000 - ₹2,00,000)
  - Research packages (₹3,00,000+)
  - Course subscriptions

- **Payment Methods**
  - Credit/Debit Cards (Visa, Mastercard, Amex)
  - Digital Wallets (Apple Pay, Google Pay)
  - Bank Transfers (UPI, NetBanking, NEFT)
  - PayPal
  - Cryptocurrency (optional)

#### Donation System
- **Flexible Donations**
  - Custom amounts
  - One-time & recurring
  - Anonymous donations
  - Impact tracking

- **Donation Features**
  - Tax receipt generation
  - Donor recognition (optional)
  - Thank you emails
  - Public fundraising goals
  - Donation leaderboard

### Payment Flow Diagram

```
User Selects Product/Service
    ↓
View Pricing & Details
    ↓
Click "Buy Now" / "Donate"
    ↓
Create Payment Intent (Backend)
    ↓
Display Payment Form (Stripe/PayPal)
    ↓
User Enters Details
    ↓
Process Payment
    ↓
Payment Success ✓ / Failure ✗
    ↓
    ├─ Success:
    │  ├─ Update Database
    │  ├─ Send Receipt Email
    │  ├─ Grant Access
    │  └─ Show Thank You Page
    │
    └─ Failure:
       ├─ Display Error Message
       ├─ Suggest Retry
       └─ Show Support Contact
```

### API Endpoints ✨

```javascript
// Payment Endpoints
POST   /api/payments/create-intent
POST   /api/payments/confirm
POST   /api/payments/webhook
GET    /api/payments/history
GET    /api/payments/status/:id
GET    /api/payments/receipt/:id

// Donation Endpoints
POST   /api/donations/create
GET    /api/donations
GET    /api/donations/summary
GET    /api/donations/leaderboard
POST   /api/donations/webhook
GET    /api/donations/receipt/:id

// Subscription Endpoints
GET    /api/subscriptions
POST   /api/subscriptions/create
POST   /api/subscriptions/cancel
PUT    /api/subscriptions/update
```

### Database Tables ✨

#### payments table
```sql
CREATE TABLE payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  transaction_id VARCHAR(255) UNIQUE,
  payment_method VARCHAR(50),
  amount DECIMAL(12, 2),
  currency VARCHAR(3),
  status VARCHAR(50),
  product_type VARCHAR(100),
  product_id INT,
  description TEXT,
  payment_date TIMESTAMP,
  receipt_url VARCHAR(255),
  metadata JSON,
  created_at TIMESTAMP
);
```

#### donations table
```sql
CREATE TABLE donations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  donor_name VARCHAR(100),
  donor_email VARCHAR(100),
  amount DECIMAL(12, 2),
  currency VARCHAR(3),
  payment_method VARCHAR(50),
  status VARCHAR(50),
  transaction_id VARCHAR(255),
  message TEXT,
  anonymous BOOLEAN,
  receipt_url VARCHAR(255),
  donation_date TIMESTAMP,
  created_at TIMESTAMP
);
```

#### subscriptions table
```sql
CREATE TABLE subscriptions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  tier VARCHAR(50),
  amount DECIMAL(12, 2),
  billing_cycle VARCHAR(50),
  status VARCHAR(50),
  stripe_subscription_id VARCHAR(255),
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  next_billing_date TIMESTAMP,
  created_at TIMESTAMP
);
```

---

## 🌐 Complete API Reference

### Content APIs
```
GET /api/main-categories          - All categories
GET /api/concept-books            - All books
GET /api/concept-books/:level     - By level
GET /api/products                 - All products
GET /api/products/:level          - By level
GET /api/research                 - All research
GET /api/research/:type           - By type
```

### Payment APIs ✨
```
POST /api/payments/create-intent  - Create payment
POST /api/payments/confirm        - Confirm payment
GET  /api/payments/history        - Payment history
GET  /api/payments/receipt/:id    - Get receipt
POST /api/payments/webhook        - Stripe webhook
```

### Donation APIs ✨
```
POST /api/donations/create        - Create donation
GET  /api/donations               - List donations
GET  /api/donations/summary       - Summary stats
GET  /api/donations/leaderboard   - Top donors
POST /api/donations/webhook       - PayPal webhook
GET  /api/donations/receipt/:id   - Get receipt
```

### User APIs
```
POST /api/users/register          - Register user
POST /api/users/login             - Login user
GET  /api/users/profile           - Get profile
PUT  /api/users/profile           - Update profile
GET  /api/users/purchases         - Purchase history
```

---

## 🔒 Security for Payments ✨

✅ **PCI Compliance**
- Never store credit card data
- Use tokenization (Stripe/PayPal)
- Secure transmission (HTTPS/TLS)

✅ **Webhook Security**
- Signature verification
- Timestamp validation
- Idempotency checks

✅ **Data Protection**
- Encryption at rest
- Encryption in transit
- Access control lists

✅ **Fraud Prevention**
- CVV verification
- 3D Secure
- Rate limiting
- IP blacklisting

---

## 📊 Sample Implementation

### Create Payment (Backend)
```javascript
// POST /api/payments/create-intent
const createPaymentIntent = async (req, res) => {
  const { amount, currency, productId } = req.body;
  
  try {
    const intent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency,
      metadata: { productId }
    });
    
    res.json({ clientSecret: intent.client_secret });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

### Create Donation (Frontend)
```javascript
// React component
const DonationWidget = () => {
  const [amount, setAmount] = useState(500);
  
  const handleDonate = async () => {
    const response = await axios.post('/api/donations/create', {
      amount,
      donorName: 'John Doe',
      donorEmail: 'john@example.com',
      paymentMethod: 'stripe'
    });
    
    // Redirect to checkout
    window.location.href = response.data.checkoutUrl;
  };
  
  return (
    <div className="donation-widget">
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleDonate}>Donate ₹{amount}</button>
    </div>
  );
};
```

---

## 📈 Business Analytics

### Payment Metrics
```
├─ Total Revenue
├─ Payment Success Rate
├─ Average Transaction Value
├─ Popular Products
├─ Revenue by Category
└─ Refund Rate
```

### Donation Metrics ✨
```
├─ Total Donations
├─ Number of Donors
├─ Average Donation
├─ Recurring Donation Rate
├─ Donor Retention
└─ Campaign Performance
```

---

## ✅ Implementation Checklist

- [ ] Design database schema
- [ ] Create Stripe account & get API keys
- [ ] Create PayPal account & get API keys
- [ ] Implement payment controller
- [ ] Implement donation controller
- [ ] Create frontend payment form
- [ ] Create donation widget
- [ ] Set up webhook handlers
- [ ] Test payment flow
- [ ] Test donation flow
- [ ] Email receipt generation
- [ ] Error handling
- [ ] Analytics tracking
- [ ] Security audit
- [ ] Load testing
- [ ] Production deployment

---

## 🎉 Architecture Complete!

This comprehensive architecture includes:
✅ Full content management system
✅ Integrated payment processing
✅ Flexible donation system
✅ User management & authentication
✅ Database design with all required tables
✅ API endpoints for all features
✅ Security best practices
✅ Scalability considerations
✅ Analytics & reporting
✅ Email notifications

**Status**: ✨ Ready for Implementation
