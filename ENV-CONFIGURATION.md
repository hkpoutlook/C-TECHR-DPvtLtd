# Environment Configuration for ctechrnd.com Payment System

## Backend .env Configuration

Create a `.env` file in the `/website/backend` directory with the following variables:

```bash
# ==========================================
# SERVER CONFIGURATION
# ==========================================
NODE_ENV=production
PORT=5000
API_URL=https://api.ctechrnd.com
FRONTEND_URL=https://www.ctechrnd.com
SECRET_KEY=your-secret-key-here-min-32-chars

# ==========================================
# DATABASE CONFIGURATION
# ==========================================
DB_HOST=localhost
DB_USER=ctechr_user
DB_PASSWORD=your-secure-password-here
DB_NAME=ctechr_database
DB_PORT=3306

# ==========================================
# STRIPE CONFIGURATION
# ==========================================
STRIPE_PUBLIC_KEY=pk_live_51234567890abcdefghijklmnopqrstuvwxyz
STRIPE_SECRET_KEY=sk_live_abcdefghijklmnopqrstuvwxyz123456789
STRIPE_WEBHOOK_SECRET=whsec_test_secret_or_live_secret_here

# For testing (Stripe provides test keys)
STRIPE_TEST_PUBLIC_KEY=pk_test_51234567890abcdefghijklmnopqrstuvwxyz
STRIPE_TEST_SECRET_KEY=sk_test_abcdefghijklmnopqrstuvwxyz123456789
STRIPE_TEST_WEBHOOK_SECRET=whsec_test_1234567890abcdefghijk

# ==========================================
# PAYPAL CONFIGURATION
# ==========================================
PAYPAL_CLIENT_ID=your-paypal-client-id-here
PAYPAL_CLIENT_SECRET=your-paypal-client-secret-here
PAYPAL_MODE=live  # 'sandbox' for testing, 'live' for production

# For testing
PAYPAL_SANDBOX_CLIENT_ID=test-client-id
PAYPAL_SANDBOX_CLIENT_SECRET=test-client-secret

# ==========================================
# EMAIL CONFIGURATION (SMTP)
# ==========================================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=noreply@ctechrnd.com
SMTP_PASSWORD=your-app-specific-password-here
SMTP_FROM=noreply@ctechrnd.com
SMTP_FROM_NAME=ctechrnd.com Support

# Alternative email provider (SendGrid)
# SENDGRID_API_KEY=SG.your-sendgrid-api-key-here

# ==========================================
# SECURITY CONFIGURATION
# ==========================================
JWT_SECRET=your-jwt-secret-key-here-min-32-chars
JWT_EXPIRE=7d
SESSION_SECRET=your-session-secret-key-here-min-32-chars
CORS_ORIGIN=https://www.ctechrnd.com,https://api.ctechrnd.com

# ==========================================
# PAYMENT SETTINGS
# ==========================================
DEFAULT_CURRENCY=INR
TAX_PERCENTAGE=18  # GST for India
PAYMENT_TIMEOUT=600000  # 10 minutes in ms
REFUND_WINDOW_DAYS=30  # Days within which refunds can be issued

# Subscription prices (in INR)
BASIC_PLAN_MONTHLY=499
PROFESSIONAL_PLAN_MONTHLY=1499
RESEARCH_PLAN_MONTHLY=4999

# ==========================================
# DONATION SETTINGS
# ==========================================
DONATION_MIN_AMOUNT=100
DONATION_TAX_DEDUCTIBLE=true
DONATION_RECEIPT_AUTO_SEND=true

# ==========================================
# AWS CONFIGURATION (Optional - for S3 storage)
# ==========================================
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_S3_BUCKET=ctechrnd-receipts

# ==========================================
# LOGGING & MONITORING
# ==========================================
LOG_LEVEL=info
SENTRY_DSN=https://your-sentry-dsn-here@sentry.io/project-id
LOG_FILE_PATH=/var/log/ctechrnd/app.log

# ==========================================
# FEATURE FLAGS
# ==========================================
ENABLE_STRIPE_PAYMENTS=true
ENABLE_PAYPAL_DONATIONS=true
ENABLE_RECURRING_DONATIONS=true
ENABLE_CRYPTO_PAYMENTS=false  # Future feature
ENABLE_ANALYTICS=true

# ==========================================
# REDIS CONFIGURATION (Optional - for caching)
# ==========================================
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password
REDIS_DB=0

# ==========================================
# WEBHOOK CONFIGURATION
# ==========================================
WEBHOOK_VERIFY_SSL=true
MAX_WEBHOOK_RETRIES=3
WEBHOOK_RETRY_DELAY=60000  # ms
```

---

## Frontend .env Configuration

Create a `.env` file in the `/website/frontend` directory:

```bash
# ==========================================
# REACT CONFIGURATION
# ==========================================
REACT_APP_API_URL=https://api.ctechrnd.com
REACT_APP_FRONTEND_URL=https://www.ctechrnd.com
REACT_APP_ENV=production

# ==========================================
# STRIPE PUBLIC KEY (for frontend)
# ==========================================
REACT_APP_STRIPE_PUBLIC_KEY=pk_live_51234567890abcdefghijklmnopqrstuvwxyz

# For testing
REACT_APP_STRIPE_TEST_PUBLIC_KEY=pk_test_51234567890abcdefghijklmnopqrstuvwxyz

# ==========================================
# PAYPAL PUBLIC KEY (for frontend)
# ==========================================
REACT_APP_PAYPAL_CLIENT_ID=your-paypal-client-id-here

# For testing
REACT_APP_PAYPAL_SANDBOX_CLIENT_ID=test-client-id

# ==========================================
# GOOGLE ANALYTICS
# ==========================================
REACT_APP_GA_ID=G-XXXXXXXXXX

# ==========================================
# FEATURE FLAGS
# ==========================================
REACT_APP_ENABLE_DONATIONS=true
REACT_APP_ENABLE_RECURRING_DONATIONS=true
REACT_APP_ENABLE_PAYMENTS=true
```

---

## How to Get These Credentials

### 1. Stripe Setup

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Sign up or log in
3. Navigate to **Settings → API Keys**
4. Copy **Publishable Key** (pk_...) and **Secret Key** (sk_...)
5. For webhooks: **Developers → Webhooks**
   - Add endpoint: `https://api.ctechrnd.com/api/payments/webhook`
   - Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`, etc.
   - Copy webhook signing secret (whsec_...)

### 2. PayPal Setup

1. Go to [PayPal Developer](https://developer.paypal.com)
2. Create an app in **Apps & Credentials**
3. Select **Sandbox** or **Live** mode
4. Copy **Client ID** and **Secret**
5. For webhooks: **Sandbox/Live Settings → Webhooks**
   - Add webhook URL: `https://api.ctechrnd.com/api/donations/webhook`
   - Select events: `PAYMENT.CAPTURE.COMPLETED`, etc.

### 3. Email Configuration (Gmail)

1. Go to [Google Account](https://myaccount.google.com)
2. **Security → App Passwords**
3. Select Mail and Windows Computer
4. Copy the generated app password
5. Use email as `SMTP_USER` and app password as `SMTP_PASSWORD`

### 4. JWT Secret

Generate a secure random string:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Environment Configuration by Stage

### Development (.env.development)

```bash
NODE_ENV=development
STRIPE_SECRET_KEY=sk_test_...
PAYPAL_MODE=sandbox
LOG_LEVEL=debug
ENABLE_STRIPE_PAYMENTS=true
ENABLE_PAYPAL_DONATIONS=true
```

### Staging (.env.staging)

```bash
NODE_ENV=staging
STRIPE_SECRET_KEY=sk_test_...
PAYPAL_MODE=sandbox
LOG_LEVEL=info
ENABLE_STRIPE_PAYMENTS=true
ENABLE_PAYPAL_DONATIONS=true
```

### Production (.env.production)

```bash
NODE_ENV=production
STRIPE_SECRET_KEY=sk_live_...
PAYPAL_MODE=live
LOG_LEVEL=warn
ENABLE_STRIPE_PAYMENTS=true
ENABLE_PAYPAL_DONATIONS=true
```

---

## Security Best Practices

⚠️ **IMPORTANT**: Never commit `.env` files to version control!

1. **Add to .gitignore**:
   ```
   .env
   .env.local
   .env.*.local
   ```

2. **Use environment-specific configurations**:
   - Different keys for dev/staging/production
   - Rotate keys regularly

3. **Secure storage**:
   - Use AWS Secrets Manager in production
   - Use HashiCorp Vault for key management
   - Enable 2FA on all service accounts

4. **Audit logging**:
   - Log all payment operations
   - Monitor webhook events
   - Set up alerts for failed transactions

---

## Testing Configuration

For local testing without real payments:

```bash
# Use Stripe test keys
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Use PayPal sandbox
PAYPAL_MODE=sandbox

# Use dummy email
SMTP_USER=test@example.com

# Disable webhooks
WEBHOOK_VERIFY_SSL=false
```

### Test Cards (Stripe)

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

### Test Accounts (PayPal)

Log into [PayPal Sandbox](https://sandbox.paypal.com) with test credentials

---

## Quick Setup Script

Create `setup-env.sh`:

```bash
#!/bin/bash

# Create backend .env
cat > website/backend/.env << EOF
NODE_ENV=development
PORT=5000
STRIPE_TEST_SECRET_KEY=sk_test_YOUR_KEY
PAYPAL_SANDBOX_CLIENT_ID=YOUR_ID
PAYPAL_MODE=sandbox
DB_HOST=localhost
STRIPE_TEST_PUBLIC_KEY=pk_test_YOUR_KEY
EOF

# Create frontend .env
cat > website/frontend/.env << EOF
REACT_APP_STRIPE_TEST_PUBLIC_KEY=pk_test_YOUR_KEY
REACT_APP_PAYPAL_SANDBOX_CLIENT_ID=YOUR_ID
REACT_APP_API_URL=http://localhost:5000
EOF

echo "✅ Environment files created successfully!"
echo "⚠️  Don't forget to add your actual API keys!"
```

Run: `chmod +x setup-env.sh && ./setup-env.sh`

---

**Status**: ✨ Configuration ready for deployment!
