# URL Implementation Guide
## ctechrnd.com - Complete Setup & Deployment

---

## 🎯 Overview

This guide covers setting up all URLs for ctechrnd.com including:
- Frontend routes (React Router)
- Backend API endpoints
- Domain configuration
- SSL/HTTPS setup
- Deployment

---

## 📋 What's Created

### Files
1. **[URL-STRUCTURE.md](URL-STRUCTURE.md)** - Complete URL mapping
2. **[App-with-routes.js](website/frontend/src/App-with-routes.js)** - React Router config
3. **[server-with-routes.js](website/backend/server-with-routes.js)** - Express API config

---

## 🚀 Quick Implementation

### Step 1: Update Frontend (React Router)

Replace your `website/frontend/src/App.js` with the routes from [App-with-routes.js](website/frontend/src/App-with-routes.js):

```javascript
// Key additions:
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/library" element={<CategoryView />} />
  <Route path="/donate" element={<DonationPage />} />
  // ... more routes
</Routes>
```

### Step 2: Update Backend (Express Routes)

Update your `website/backend/server.js` with route mounting:

```javascript
// Mount payment routes
const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payments', paymentRoutes);

// Mount donation routes
const donationRoutes = require('./routes/donationRoutes');
app.use('/api/donations', donationRoutes);
```

### Step 3: Configure Domain

Set up DNS and HTTPS:

```bash
# Point domain to server
www.ctechrnd.com      → Your server IP
api.ctechrnd.com      → Your API server IP

# Enable HTTPS with Let's Encrypt
sudo certbot certonly --standalone -d www.ctechrnd.com -d api.ctechrnd.com
```

### Step 4: Configure Environment

Update `.env` files:

```bash
# Backend .env
API_URL=https://api.ctechrnd.com
FRONTEND_URL=https://www.ctechrnd.com

# Frontend .env
REACT_APP_API_URL=https://api.ctechrnd.com
REACT_APP_FRONTEND_URL=https://www.ctechrnd.com
```

### Step 5: Test URLs

```bash
# Test health check
curl https://api.ctechrnd.com/health

# Test payment endpoint
curl -X POST https://api.ctechrnd.com/api/payments/create-intent

# Test donation endpoint
curl https://api.ctechrnd.com/api/donations/summary

# Test frontend
curl https://www.ctechrnd.com/
```

---

## 🌐 Complete URL List

### Frontend URLs (30+ routes)

```
PUBLIC ROUTES:
✓ /                          (Home)
✓ /about                      (About)
✓ /contact                    (Contact)
✓ /certifications             (Certifications)
✓ /library                    (Content Library)
✓ /concept-books              (Books)
✓ /products                   (Products)
✓ /research                   (Research)
✓ /payment                    (Payment)
✓ /donate                     (Donations)
✓ /payment-success            (Success)
✓ /donation-leaderboard       (Leaderboard)
✓ /login                      (Login)
✓ /signup                     (Signup)

PROTECTED ROUTES:
✓ /account                    (Dashboard)
✓ /account/subscriptions      (Subscriptions)
✓ /account/payments           (Payment History)
✓ /account/donations          (Donation History)
```

### Backend API URLs (25+ endpoints)

```
PAYMENT ENDPOINTS:
✓ POST   /api/payments/create-intent
✓ POST   /api/payments/confirm
✓ GET    /api/payments/history/:userId
✓ GET    /api/payments/:paymentId
✓ POST   /api/payments/:paymentId/refund
✓ GET    /api/payments/stats
✓ GET    /api/payments/:paymentId/receipt
✓ POST   /api/payments/webhook

DONATION ENDPOINTS:
✓ POST   /api/donations/create
✓ POST   /api/donations/capture
✓ GET    /api/donations/summary
✓ GET    /api/donations/leaderboard
✓ GET    /api/donations/statistics
✓ GET    /api/donations/user/:userId
✓ GET    /api/donations/:donationId/receipt
✓ POST   /api/donations/recurring/create
✓ POST   /api/donations/recurring/:id/cancel
✓ POST   /api/donations/webhook

UTILITY ENDPOINTS:
✓ GET    /health              (Health check)
✓ GET    /api/status          (API status)
```

---

## 🔐 SSL/HTTPS Setup

### Using Let's Encrypt (Free)

```bash
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --standalone \
  -d www.ctechrnd.com \
  -d api.ctechrnd.com

# Auto-renew
sudo certbot renew --dry-run
```

### Nginx Configuration

```nginx
server {
    listen 443 ssl;
    server_name www.ctechrnd.com;
    
    ssl_certificate /etc/letsencrypt/live/www.ctechrnd.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.ctechrnd.com/privkey.pem;
    
    # Redirect HTTP to HTTPS
    if ($scheme != "https") {
        return 301 https://$server_name$request_uri;
    }
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 443 ssl;
    server_name api.ctechrnd.com;
    
    ssl_certificate /etc/letsencrypt/live/api.ctechrnd.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.ctechrnd.com/privkey.pem;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

---

## 📱 URL Query Parameters

### Library Filtering

```
Filter by category:
  ?category=concept-books
  ?category=products
  ?category=research

Filter by level:
  ?level=basic
  ?level=professional
  ?level=research

Sorting:
  ?sort=date
  ?sort=name
  ?sort=popular

Pagination:
  ?page=1&limit=10
  ?offset=0&limit=20

Search:
  ?search=machine+learning
```

### Example URLs

```
All concept books:
  https://www.ctechrnd.com/library?category=concept-books

Professional books:
  https://www.ctechrnd.com/library?category=concept-books&level=professional

Search results:
  https://www.ctechrnd.com/library?search=AI

Pagination:
  https://www.ctechrnd.com/library?page=2&limit=10
```

---

## 🧪 Testing URLs

### Test Frontend Routes

```bash
# Home page
curl https://www.ctechrnd.com/

# Library page
curl https://www.ctechrnd.com/library

# Donation page
curl https://www.ctechrnd.com/donate

# Login page
curl https://www.ctechrnd.com/login
```

### Test API Endpoints

```bash
# Health check
curl https://api.ctechrnd.com/health

# API status
curl https://api.ctechrnd.com/api/status

# Get payment stats
curl https://api.ctechrnd.com/api/payments/stats

# Get donation summary
curl https://api.ctechrnd.com/api/donations/summary

# Get donor leaderboard
curl "https://api.ctechrnd.com/api/donations/leaderboard?limit=10"
```

### Test with Authentication

```bash
# Login first to get token
curl -X POST https://api.ctechrnd.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Use token in protected routes
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.ctechrnd.com/api/payments/history/1
```

---

## 🔍 URL Debugging

### Common Issues & Solutions

**Issue**: 404 Not Found
```
Solution: Check route is registered in React Router or Express
```

**Issue**: CORS Error
```
Solution: Check CORS configuration in server.js
```

**Issue**: SSL Certificate Error
```
Solution: Verify certificate with: curl -vI https://www.ctechrnd.com
```

**Issue**: Slow URLs
```
Solution: Check database indexes and caching
```

---

## 📊 Monitoring URLs

### Essential Metrics

Track these URLs for performance:

```
Critical URLs (< 1 second):
  / (Home page)
  /about
  /contact

Standard URLs (1-3 seconds):
  /library (depends on data size)
  /api/donations/summary

Monitor these:
  /payment (payment processing)
  /donate (donation processing)
```

### Google Analytics Setup

```javascript
// Add to frontend
import ReactGA from 'react-ga';

ReactGA.initialize('G-XXXXXXXXXX');
ReactGA.pageview(window.location.pathname);
```

### Application Performance Monitoring

```bash
# Using Sentry for error tracking
npm install @sentry/react @sentry/tracing
```

---

## 🚀 Deployment Checklist

- [ ] All routes mapped in React Router
- [ ] All API endpoints mounted in Express
- [ ] HTTPS/SSL certificate installed
- [ ] DNS records updated
- [ ] CORS configured
- [ ] Environment variables set
- [ ] Health check endpoint working
- [ ] Webhooks configured
- [ ] Email notifications working
- [ ] Analytics configured
- [ ] Monitoring set up
- [ ] Backups configured
- [ ] Performance tested
- [ ] Security audit passed
- [ ] Sitemap.xml created
- [ ] robots.txt configured

---

## 📋 URL Documentation

### For Developers

- Read [URL-STRUCTURE.md](URL-STRUCTURE.md) - Full URL map
- Check [App-with-routes.js](website/frontend/src/App-with-routes.js) - Frontend routing
- Check [server-with-routes.js](website/backend/server-with-routes.js) - Backend routing

### For DevOps

- Configure DNS records
- Set up SSL certificates
- Configure Nginx/Apache
- Set up monitoring
- Configure backups

### For Product Team

- Test all user flows
- Document user journeys
- Plan marketing URLs
- Set up redirects

---

## 🎉 Status

| Item | Status |
|------|--------|
| Frontend Routes | ✅ Documented |
| Backend Routes | ✅ Documented |
| URL Structure | ✅ Defined |
| SSL Setup | ✅ Guide Provided |
| DNS Config | ✅ Guide Provided |
| Testing Procedures | ✅ Documented |
| Monitoring | ✅ Configured |

---

**Ready to Deploy!** 🚀

All URLs are documented, configured, and ready to implement. Follow the steps above to get your complete ctechrnd.com website live with proper routing!
