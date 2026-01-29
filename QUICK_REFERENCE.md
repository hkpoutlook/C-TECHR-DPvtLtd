# Quick Reference Guide - Payment System Setup
## ctechrnd.com

---

## 🚀 5-Minute Quick Start

### Step 1: Get Credentials (2 min)

**Stripe**:
1. Go to https://stripe.com → Sign up
2. Get keys from Dashboard → Settings → API Keys
3. Copy `pk_live_...` and `sk_live_...`

**PayPal**:
1. Go to https://developer.paypal.com → Create app
2. Copy Client ID and Secret
3. Set mode to 'live'

### Step 2: Configure Environment (1 min)

```bash
# Backend
cd website/backend
cat > .env << 'EOF'
STRIPE_PUBLIC_KEY=pk_live_YOUR_KEY
STRIPE_SECRET_KEY=sk_live_YOUR_KEY
PAYPAL_CLIENT_ID=YOUR_ID
PAYPAL_MODE=live
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ctechr_database
EOF

# Frontend
cd ../frontend
cat > .env << 'EOF'
REACT_APP_STRIPE_PUBLIC_KEY=pk_live_YOUR_KEY
REACT_APP_API_URL=https://api.ctechrnd.com
EOF
```

### Step 3: Setup Database (1 min)

```bash
mysql -u root -p ctechr_database < database/payments_schema.sql
```

### Step 4: Install Dependencies (1 min)

```bash
# Backend
cd website/backend
npm install stripe @paypal/checkout-server-sdk nodemailer pdfkit qrcode

# Frontend
cd ../frontend
npm install @stripe/react-stripe-js @stripe/js
```

---

## 📋 Essential API Endpoints

### Payments
```
POST   /api/payments/create-intent        Create Stripe payment
POST   /api/payments/confirm               Confirm payment
GET    /api/payments/history/:userId       View payment history
POST   /api/payments/:id/refund            Refund a payment
GET    /api/payments/stats                 Get payment stats
POST   /api/payments/webhook               Stripe webhook
```

### Donations
```
POST   /api/donations/create               Create donation
POST   /api/donations/capture              Capture PayPal donation
GET    /api/donations/summary              Donation stats
GET    /api/donations/leaderboard          Top donors
POST   /api/donations/recurring/create     Set up recurring
POST   /api/donations/webhook              PayPal webhook
```

---

## 🧪 Test Cards

| Type | Card Number | CVC | Date |
|------|-------------|-----|------|
| Success | 4242 4242 4242 4242 | Any | Any future |
| Decline | 4000 0000 0000 0002 | Any | Any future |
| 3D Secure | 4000 0025 0000 3155 | Any | Any future |

---

## 📁 Key Files Location

```
Database:         database/payments_schema.sql
Payment Logic:    website/backend/controllers/paymentController.js
Donation Logic:   website/backend/controllers/donationController.js
Payment Routes:   website/backend/routes/paymentRoutes.js
Donation Routes:  website/backend/routes/donationRoutes.js
Config Guide:     ENV-CONFIGURATION.md
Full Guide:       PAYMENT_GUIDE.md
Architecture:     ARCHITECTURE.md
```

---

## ⚡ Common Commands

```bash
# Test Stripe payment endpoint
curl -X POST http://localhost:5000/api/payments/create-intent \
  -H "Content-Type: application/json" \
  -d '{"amount": 5000, "currency": "inr", "userId": 1}'

# Get payment stats
curl http://localhost:5000/api/payments/stats

# Get donation summary
curl http://localhost:5000/api/donations/summary

# Get top 5 donors
curl "http://localhost:5000/api/donations/leaderboard?limit=5"
```

---

## 🔐 Security Checklist

- [ ] API keys stored in .env files
- [ ] .env files in .gitignore
- [ ] HTTPS enabled on all routes
- [ ] Webhook signatures verified
- [ ] Input validation on all forms
- [ ] Rate limiting enabled
- [ ] CORS configured properly
- [ ] Error messages don't expose sensitive info

---

## 📞 Troubleshooting

**Payment Intent Creation Failed**
```
✓ Check Stripe API key is correct
✓ Check currency is valid (use 'inr' for India)
✓ Check amount is > 0
✓ Verify CORS allows your frontend domain
```

**Donation Not Capturing**
```
✓ Check PayPal credentials
✓ Verify webhook URL is accessible
✓ Check PayPal mode (sandbox vs live)
✓ Verify order ID is correct
```

**Email Not Sending**
```
✓ Check SMTP credentials
✓ Verify email service is running
✓ Check firewall isn't blocking SMTP port
✓ Check app password (not main password)
```

**Database Connection Error**
```
✓ Verify MySQL is running
✓ Check DB_HOST, DB_USER, DB_PASSWORD
✓ Verify user has permissions
✓ Check firewall allows port 3306
```

---

## 💡 Pro Tips

1. **Test Mode First**: Always test with Stripe test keys before going live
2. **Monitor Webhooks**: Check webhook delivery in Stripe/PayPal dashboards
3. **Keep Logs**: Enable logging to catch issues quickly
4. **Email Templates**: Customize email templates for branding
5. **Backup Data**: Set up automatic database backups
6. **Monitor Performance**: Use metrics to track transaction times

---

## 📈 Metrics to Track

- Transaction success rate
- Average transaction value
- Payment method distribution
- Refund rate
- Webhook delivery success
- Email delivery success
- Customer acquisition cost
- Donation growth rate

---

## 🎯 Implementation Checklist

### Daily
- [ ] Monitor webhook events
- [ ] Check for failed transactions
- [ ] Review support tickets
- [ ] Check email delivery logs

### Weekly
- [ ] Review payment analytics
- [ ] Check donor leaderboard
- [ ] Analyze refund patterns
- [ ] Review error logs

### Monthly
- [ ] Full security audit
- [ ] Database optimization
- [ ] Performance review
- [ ] Backup verification

---

## 📚 Documentation Map

| Document | Purpose | When to Use |
|----------|---------|------------|
| ARCHITECTURE.md | System design | Planning & architecture discussions |
| PAYMENT_GUIDE.md | Implementation | Step-by-step implementation |
| ENV-CONFIGURATION.md | Setup | Configuring environment |
| This File | Quick reference | Quick lookups & testing |
| Database Schema | DB design | Database creation & management |
| Controllers | Business logic | Understanding payment flow |

---

## 🚀 Next Steps

1. **Review**: Read PAYMENT_GUIDE.md for detailed steps
2. **Configure**: Set up .env files with your credentials
3. **Database**: Create tables using payments_schema.sql
4. **Test**: Use test cards to verify payment flow
5. **Deploy**: Push to staging and test with team
6. **Launch**: Deploy to production with monitoring

---

**Last Updated**: 2024  
**Version**: 1.0  
**Status**: ✅ Ready for Implementation
