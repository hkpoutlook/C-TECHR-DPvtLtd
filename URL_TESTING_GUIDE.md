# URL Testing Guide
## C-TECH Research & Development Pvt. Ltd.
## ctechrnd.com - Complete URL Testing Procedures

---

## 🚀 Quick Start Testing

### 1. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd website/backend
npm install --legacy-peer-deps
npm start
```

Expected output:
```
╔════════════════════════════════════════╗
║  ctechrnd.com API Server              ║
║  Version: 1.0                          ║
╠════════════════════════════════════════╣
║  Server running on port 5000           ║
║  Environment: development              ║
║  Database: localhost                   ║
╠════════════════════════════════════════╣
║  Available Routes: [...]               ║
╚════════════════════════════════════════╝
```

**Terminal 2 - Frontend:**
```bash
cd website/frontend
npm install --legacy-peer-deps
npm start
```

Expected output:
```
Compiled successfully!
You can now view ctechr-frontend in the browser.
  http://localhost:3000
```

---

## 📝 Test Cases

### A. Health Check Endpoints

#### Test A1: Backend Health
```bash
curl http://localhost:5000/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-29T10:00:00.000Z",
  "uptime": 45.234,
  "environment": "development"
}
```

#### Test A2: API Health
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "api": "ctechrnd.com",
  "status": "running",
  "timestamp": "2024-01-29T10:00:00.000Z",
  "uptime": 45.234
}
```

#### Test A3: API Status
```bash
curl http://localhost:5000/api/status
```

**Expected Response:**
```json
{
  "api": "ctechrnd.com",
  "version": "1.0",
  "status": "running",
  "environment": "development",
  "endpoints": {
    "payments": "/api/payments",
    "donations": "/api/donations",
    "content": "/api/concept-books, /api/products, /api/research"
  },
  "timestamp": "2024-01-29T10:00:00.000Z"
}
```

✅ **Pass Criteria:** All endpoints return 200 status with proper JSON

---

### B. Content Endpoints

#### Test B1: Main Categories
```bash
curl http://localhost:5000/api/main-categories
```

**Expected:** Array with 3 categories (Concept Books, Products, Research)

#### Test B2: Concept Books
```bash
curl http://localhost:5000/api/concept-books
```

**Expected:** Object with basic, professional, research levels

#### Test B3: Concept Books by Level
```bash
curl http://localhost:5000/api/concept-books/basic
curl http://localhost:5000/api/concept-books/professional
curl http://localhost:5000/api/concept-books/research
```

**Expected:** Specific level with books array

#### Test B4: Products
```bash
curl http://localhost:5000/api/products
curl http://localhost:5000/api/products/foundation
curl http://localhost:5000/api/products/industrial
curl http://localhost:5000/api/products/research
```

**Expected:** Products grouped by level

#### Test B5: Research
```bash
curl http://localhost:5000/api/research
curl http://localhost:5000/api/research/papers
curl http://localhost:5000/api/research/projects
curl http://localhost:5000/api/research/advancedProducts
```

**Expected:** Research data grouped by type

#### Test B6: All Content
```bash
curl http://localhost:5000/api/all-content
```

**Expected:** Complete unified data structure

✅ **Pass Criteria:** All content endpoints return correct data structures

---

### C. Payment Endpoints

#### Test C1: Create Payment Intent
```bash
curl -X POST http://localhost:5000/api/payments/create-intent \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 5000,
    "currency": "USD",
    "userId": "user123"
  }'
```

**Expected:** 200 or 201 status with payment intent data

#### Test C2: Get Payment Stats
```bash
curl http://localhost:5000/api/payments/stats
```

**Expected:** Statistics object or appropriate status

#### Test C3: Get Payment History
```bash
curl http://localhost:5000/api/payments/history/user123
```

**Expected:** Array of payments or 404 if not found

#### Test C4: Get Specific Payment
```bash
curl http://localhost:5000/api/payments/payment123
```

**Expected:** Payment details or 404

✅ **Pass Criteria:** Endpoints respond with proper status codes and data

---

### D. Donation Endpoints

#### Test D1: Create Donation
```bash
curl -X POST http://localhost:5000/api/donations/create \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1000,
    "donorName": "John Doe",
    "donorEmail": "john@example.com",
    "message": "Support your work"
  }'
```

**Expected:** 200 or 201 status with donation data

#### Test D2: Get Donation Summary
```bash
curl http://localhost:5000/api/donations/summary
```

**Expected:** Donation summary statistics

#### Test D3: Get Leaderboard
```bash
curl http://localhost:5000/api/donations/leaderboard
```

**Expected:** Top donors list

#### Test D4: Get Donation Stats
```bash
curl http://localhost:5000/api/donations/statistics
```

**Expected:** Detailed statistics

#### Test D5: Get User Donations
```bash
curl http://localhost:5000/api/donations/user/user123
```

**Expected:** User's donation history

✅ **Pass Criteria:** All donation endpoints functional

---

### E. Form Submission Endpoints

#### Test E1: Submit Inquiry
```bash
curl -X POST http://localhost:5000/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "category": "products",
    "type": "industrial",
    "message": "Interested in your solutions"
  }'
```

**Expected:** 200 with success message

#### Test E2: Book Download Request
```bash
curl -X POST http://localhost:5000/api/book-download-request \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "bookId": 5,
    "category": "professional"
  }'
```

**Expected:** 200 with success message

#### Test E3: Product Inquiry
```bash
curl -X POST http://localhost:5000/api/product-inquiry \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ABC Company",
    "email": "contact@abc.com",
    "productId": 4,
    "requirement": "Need 10 units",
    "budget": "500000"
  }'
```

**Expected:** 200 with success message

#### Test E4: Research Inquiry
```bash
curl -X POST http://localhost:5000/api/research-inquiry \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Smith",
    "email": "dr.smith@university.edu",
    "type": "collaboration",
    "topic": "AI-based measurement systems",
    "description": "Interested in partnership"
  }'
```

**Expected:** 200 with success message

✅ **Pass Criteria:** Forms accept data and return confirmation

---

### F. Frontend Route Testing

Open http://localhost:3000 in browser and test:

#### Public Routes
- [ ] / - Home page loads
- [ ] /about - About page loads
- [ ] /contact - Contact page loads
- [ ] /certifications - Certifications page loads
- [ ] /library - Content library loads
- [ ] /concept-books - Concept books page loads
- [ ] /products - Products page loads
- [ ] /research - Research page loads

#### Expected Pages
- [ ] /payment - Payment page (when component created)
- [ ] /donate - Donation page (when component created)
- [ ] /login - Login page (when component created)
- [ ] /signup - Signup page (when component created)

#### Protected Routes (when auth implemented)
- [ ] /account - User account (requires login)
- [ ] /account/subscriptions - Subscriptions
- [ ] /account/payments - Payment history
- [ ] /account/donations - Donation history

✅ **Pass Criteria:** All routes load without errors, API calls work

---

### G. Error Handling

#### Test G1: Invalid Endpoint
```bash
curl http://localhost:5000/api/invalid-endpoint
```

**Expected:**
```json
{
  "error": "Not Found",
  "message": "Route GET /api/invalid-endpoint not found",
  "timestamp": "2024-01-29T10:00:00.000Z"
}
```

#### Test G2: Invalid Method
```bash
curl -X DELETE http://localhost:5000/api/concept-books
```

**Expected:** 404 error

#### Test G3: Invalid Request Body
```bash
curl -X POST http://localhost:5000/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{invalid json}'
```

**Expected:** 400 Bad Request

✅ **Pass Criteria:** Proper error responses with status codes

---

## 🔍 Automated Testing

### Create test script (test-urls.sh):
```bash
#!/bin/bash

echo "🧪 Testing C-TECHR URLs..."
echo ""

# Health checks
echo "✓ Health check tests:"
curl -s http://localhost:5000/health > /dev/null && echo "  ✅ /health" || echo "  ❌ /health"
curl -s http://localhost:5000/api/health > /dev/null && echo "  ✅ /api/health" || echo "  ❌ /api/health"
curl -s http://localhost:5000/api/status > /dev/null && echo "  ✅ /api/status" || echo "  ❌ /api/status"

# Content endpoints
echo ""
echo "✓ Content endpoints:"
curl -s http://localhost:5000/api/concept-books > /dev/null && echo "  ✅ /api/concept-books" || echo "  ❌ /api/concept-books"
curl -s http://localhost:5000/api/products > /dev/null && echo "  ✅ /api/products" || echo "  ❌ /api/products"
curl -s http://localhost:5000/api/research > /dev/null && echo "  ✅ /api/research" || echo "  ❌ /api/research"

# Payment endpoints
echo ""
echo "✓ Payment endpoints:"
curl -s http://localhost:5000/api/payments/stats > /dev/null && echo "  ✅ /api/payments/stats" || echo "  ❌ /api/payments/stats"

# Donation endpoints
echo ""
echo "✓ Donation endpoints:"
curl -s http://localhost:5000/api/donations/summary > /dev/null && echo "  ✅ /api/donations/summary" || echo "  ❌ /api/donations/summary"
curl -s http://localhost:5000/api/donations/leaderboard > /dev/null && echo "  ✅ /api/donations/leaderboard" || echo "  ❌ /api/donations/leaderboard"

echo ""
echo "✅ All URL tests completed!"
```

### Run tests:
```bash
chmod +x test-urls.sh
./test-urls.sh
```

---

## 📊 Performance Testing

### Load Testing with Apache Bench:
```bash
# Install
sudo apt install apache2-utils

# Test homepage
ab -n 1000 -c 10 http://localhost:3000/

# Test API
ab -n 1000 -c 10 http://localhost:5000/api/concept-books
```

### Measure Response Times:
```bash
# Time a request
time curl http://localhost:5000/api/products

# Detailed timing
curl -w "\nTime: %{time_total}s\n" http://localhost:5000/api/research
```

---

## ✅ Testing Checklist

- [ ] All health checks respond
- [ ] All content endpoints return data
- [ ] All payment endpoints accessible
- [ ] All donation endpoints accessible
- [ ] All form endpoints accept data
- [ ] Frontend routes load
- [ ] Error handling works
- [ ] CORS allows requests
- [ ] Performance acceptable
- [ ] No console errors
- [ ] Database connected
- [ ] APIs return proper status codes
- [ ] Response times acceptable
- [ ] Environment variables configured

---

## 🎯 Success Criteria

✅ **All tests must pass for production deployment**

1. All endpoints return 200/201 for valid requests
2. Invalid requests return appropriate error codes (400, 404, 500)
3. Response times < 1 second for static content
4. Response times < 3 seconds for API calls
5. All frontend routes load without errors
6. No console errors or warnings
7. CORS configured correctly
8. Database connections working
9. All required environment variables set
10. Error handling graceful and informative

---

## 📝 Test Results Template

```
Date: ___________
Environment: ___________
Tester: ___________

HEALTH CHECKS:
[ ] /health - Status: ____ Response Time: ____ms
[ ] /api/health - Status: ____ Response Time: ____ms
[ ] /api/status - Status: ____ Response Time: ____ms

CONTENT ENDPOINTS:
[ ] /api/concept-books - Status: ____ Response Time: ____ms
[ ] /api/products - Status: ____ Response Time: ____ms
[ ] /api/research - Status: ____ Response Time: ____ms

PAYMENT ENDPOINTS:
[ ] /api/payments/stats - Status: ____ Response Time: ____ms
[ ] /api/payments/create-intent - Status: ____ Response Time: ____ms

DONATION ENDPOINTS:
[ ] /api/donations/summary - Status: ____ Response Time: ____ms
[ ] /api/donations/leaderboard - Status: ____ Response Time: ____ms

FRONTEND ROUTES:
[ ] / - Loading: Yes/No
[ ] /about - Loading: Yes/No
[ ] /contact - Loading: Yes/No
[ ] /library - Loading: Yes/No

OVERALL: _____ (PASS/FAIL)
NOTES: _____________________________
```

---

**Ready to test! Follow the procedures above and verify all endpoints work correctly before production deployment.**
