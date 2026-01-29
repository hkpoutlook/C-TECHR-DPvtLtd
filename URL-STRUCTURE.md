# URL Configuration & Routes
## ctechrnd.com - Complete URL Mapping

---

## 🌐 Domain Structure

```
Production:  https://www.ctechrnd.com
API:         https://api.ctechrnd.com
Admin:       https://admin.ctechrnd.com
```

---

## 📍 Frontend Routes

### Main Pages

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Home.js | Landing page |
| `/about` | About.js | About company |
| `/contact` | Contact.js | Contact form |
| `/certifications` | Certifications.js | Company certifications |

### Content Library

| Route | Component | Purpose |
|-------|-----------|---------|
| `/library` | CategoryView.js | All content in one place |
| `/concept-books` | ConceptBooks.js | Concept books catalog |
| `/products` | Products.js | Products catalog |
| `/research` | Components.js | Research papers |

### Payment & Donations

| Route | Component | Purpose |
|-------|-----------|---------|
| `/payment` | PaymentPage.js | Product purchase page |
| `/donate` | DonationPage.js | Donation page |
| `/payment-success` | PaymentSuccess.js | Payment confirmation |
| `/payment-failed` | PaymentFailed.js | Payment error page |
| `/donation-success` | DonationSuccess.js | Donation confirmation |
| `/donation-leaderboard` | DonationLeaderboard.js | Top donors |

### User Account

| Route | Component | Purpose |
|-------|-----------|---------|
| `/login` | Login.js | User login |
| `/signup` | SignUp.js | User registration |
| `/account` | UserAccount.js | User dashboard |
| `/account/subscriptions` | SubscriptionManager.js | Manage subscriptions |
| `/account/payments` | PaymentHistory.js | Payment history |
| `/account/donations` | DonationHistory.js | Donation history |

---

## 🔌 Backend API Routes

### Payment Endpoints

```
POST   /api/payments/create-intent
GET    /api/payments/history/:userId
GET    /api/payments/:paymentId
POST   /api/payments/:paymentId/refund
GET    /api/payments/stats
GET    /api/payments/:paymentId/receipt
POST   /api/payments/webhook
```

### Donation Endpoints

```
POST   /api/donations/create
POST   /api/donations/capture
GET    /api/donations/summary
GET    /api/donations/leaderboard
GET    /api/donations/statistics
GET    /api/donations/user/:userId
GET    /api/donations/:donationId/receipt
POST   /api/donations/recurring/create
POST   /api/donations/recurring/:subscriptionId/cancel
POST   /api/donations/webhook
```

### Content Endpoints

```
GET    /api/concept-books
GET    /api/concept-books/:id
GET    /api/products
GET    /api/products/:id
GET    /api/research
GET    /api/research/:id
```

### User Endpoints

```
POST   /api/auth/login
POST   /api/auth/signup
POST   /api/auth/logout
GET    /api/auth/verify
GET    /api/users/:userId
PUT    /api/users/:userId
```

---

## 🎯 URL Examples

### Frontend URLs

```
Home:                    https://www.ctechrnd.com/
About:                   https://www.ctechrnd.com/about
Contact:                 https://www.ctechrnd.com/contact
Certifications:          https://www.ctechrnd.com/certifications

Library:                 https://www.ctechrnd.com/library
Concept Books:           https://www.ctechrnd.com/concept-books
Products:                https://www.ctechrnd.com/products
Research:                https://www.ctechrnd.com/research

Payment:                 https://www.ctechrnd.com/payment
Donate:                  https://www.ctechrnd.com/donate
Payment Success:         https://www.ctechrnd.com/payment-success
Donation Leaderboard:    https://www.ctechrnd.com/donation-leaderboard

Login:                   https://www.ctechrnd.com/login
Signup:                  https://www.ctechrnd.com/signup
Account:                 https://www.ctechrnd.com/account
Subscriptions:           https://www.ctechrnd.com/account/subscriptions
```

### API URLs

```
Create Payment:          https://api.ctechrnd.com/api/payments/create-intent
Get Payment Stats:       https://api.ctechrnd.com/api/payments/stats
Create Donation:         https://api.ctechrnd.com/api/donations/create
Donation Summary:        https://api.ctechrnd.com/api/donations/summary
Donor Leaderboard:       https://api.ctechrnd.com/api/donations/leaderboard
```

---

## 🔐 URL Security

### HTTPS Only
- All URLs use HTTPS (secure connection)
- HTTP requests redirect to HTTPS

### Protected Routes
```
Private URLs (Authentication Required):
  /account/*
  /account/payments
  /account/subscriptions
  /account/donations
  /payment-success
  /donation-success
```

### Public Routes
```
Public URLs (No Authentication Required):
  /
  /about
  /contact
  /certifications
  /library
  /concept-books
  /products
  /research
  /payment
  /donate
  /donation-leaderboard
  /login
  /signup
```

---

## 📱 URL Parameters

### Filtering

```
/library?category=concept-books
/library?category=products
/library?category=research
/library?level=basic
/library?level=professional
/library?level=research
/library?sort=date
/library?sort=name
/library?sort=popular
```

### Pagination

```
/library?page=1
/library?page=2
/library?limit=10
/library?offset=20
```

### Search

```
/library?search=machine+learning
/products?search=AI
/concept-books?search=database
```

---

## 🎁 Donation URLs

```
Donate $100:             https://www.ctechrnd.com/donate?amount=100
Donate $500:             https://www.ctechrnd.com/donate?amount=500
Donate $1000:            https://www.ctechrnd.com/donate?amount=1000
Custom Amount:           https://www.ctechrnd.com/donate?amount=custom
Recurring Monthly:       https://www.ctechrnd.com/donate?recurring=monthly
Recurring Yearly:        https://www.ctechrnd.com/donate?recurring=yearly
```

---

## 💳 Payment URLs

```
Buy Basic Plan:          https://www.ctechrnd.com/payment?plan=basic
Buy Professional Plan:   https://www.ctechrnd.com/payment?plan=professional
Buy Research Plan:       https://www.ctechrnd.com/payment?plan=research
Buy Product ID 1:        https://www.ctechrnd.com/payment?product=1
```

---

## 📧 Email URLs

### Confirmation Links

```
Payment Receipt:         https://www.ctechrnd.com/api/payments/{id}/receipt
Donation Receipt:        https://www.ctechrnd.com/api/donations/{id}/receipt
Verify Email:            https://www.ctechrnd.com/auth/verify?token={token}
Reset Password:          https://www.ctechrnd.com/auth/reset?token={token}
```

---

## 🗺️ Sitemap

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.ctechrnd.com/</loc>
    <lastmod>2024-01-29</lastmod>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>https://www.ctechrnd.com/about</loc>
    <lastmod>2024-01-29</lastmod>
  </url>
  <url>
    <loc>https://www.ctechrnd.com/library</loc>
    <lastmod>2024-01-29</lastmod>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://www.ctechrnd.com/donate</loc>
    <lastmod>2024-01-29</lastmod>
  </url>
  <url>
    <loc>https://www.ctechrnd.com/contact</loc>
    <lastmod>2024-01-29</lastmod>
  </url>
</urlset>
```

---

## 🔗 URL Structure Standards

### Content URLs
- Always lowercase
- Use hyphens for spaces
- Include ID when necessary
- Example: `/concept-books/machine-learning-basics`

### API URLs
- Use REST conventions
- Plural nouns for collections
- Single nouns for resources
- Example: `/api/products` (collection), `/api/products/1` (resource)

### Parameters
- Use query strings for optional filters
- Use path parameters for required IDs
- Example: `/api/products/1?sort=date&limit=10`

---

## 🚀 URL Deployment

### DNS Configuration

```
www.ctechrnd.com      → Points to frontend (CloudFlare/Vercel)
api.ctechrnd.com      → Points to backend (AWS/DigitalOcean)
admin.ctechrnd.com    → Points to admin panel
```

### Nginx Configuration

```nginx
server {
    server_name www.ctechrnd.com;
    
    location /api {
        proxy_pass https://api.ctechrnd.com;
    }
    
    location / {
        proxy_pass http://localhost:3000;
    }
}
```

---

## 📊 URL Analytics

Track these important URLs:

```
Page Views:
  - /
  - /library
  - /donate
  - /payment

Conversion Funnels:
  - /donate → /donation-success
  - /payment → /payment-success

User Actions:
  - /login
  - /signup
  - /account
```

---

## 🔄 URL Redirects

### Permanent Redirects (301)

```
/old-page            → /new-page
/products-page       → /library
/donate-now          → /donate
```

### Temporary Redirects (302)

```
/payment?test=true   → /payment
/beta-feature        → /feature
```

---

## ✅ URL Validation Checklist

- [ ] All URLs start with https://
- [ ] All URLs use www.ctechrnd.com or api.ctechrnd.com
- [ ] All routes are properly mapped in React Router
- [ ] All API endpoints are registered in Express
- [ ] Protected routes require authentication
- [ ] Public routes are accessible
- [ ] URL parameters are documented
- [ ] Sitemap is updated
- [ ] Analytics are configured
- [ ] Redirects are set up
- [ ] SSL certificate is valid
- [ ] CORS is configured

---

## 🎯 Key Performance URLs

Monitor these for performance:

```
Fast URLs (< 1s):
  ✅ /
  ✅ /about
  ✅ /contact

Moderate Speed (1-3s):
  ⚠️ /library (depends on data)
  ⚠️ /api/payments/stats

Optimize If Slow (> 3s):
  ❌ /payment
  ❌ /donate
```

---

## 📞 Support URLs

```
Help Center:         https://www.ctechrnd.com/help
FAQ:                 https://www.ctechrnd.com/faq
Contact Support:     https://www.ctechrnd.com/contact
Documentation:       https://www.ctechrnd.com/docs
Status Page:         https://status.ctechrnd.com
```

---

## 🌟 Social & External URLs

```
Facebook:            https://facebook.com/ctechrnd
Twitter:             https://twitter.com/ctechrnd
LinkedIn:            https://linkedin.com/company/ctechrnd
GitHub:              https://github.com/ctechrnd
Email:               support@ctechrnd.com
```

---

**Status**: ✨ Complete URL Structure Ready for Deployment

All URLs are configured, documented, and ready to implement!
