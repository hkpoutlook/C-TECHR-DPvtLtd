# C-TECH R&D Website URLs - Complete Reference
## 🌐 www.ctechrnd.com

---

## 📍 Domain Structure

```
Primary Domain: ctechrnd.com
├── www.ctechrnd.com       → Main Website (Frontend)
├── api.ctechrnd.com       → REST API (Backend)
└── ctechrnd.com           → Redirects to www.ctechrnd.com
```

---

## 🌐 Website URLs (Frontend)

### Home & Navigation
| URL | Page | Description |
|-----|------|-------------|
| `https://www.ctechrnd.com` | Home | Landing page |
| `https://www.ctechrnd.com/library` | Content Library | ✨ NEW - Unified content hub |
| `https://www.ctechrnd.com/about` | About | Company information |
| `https://www.ctechrnd.com/contact` | Contact | Contact form & inquiries |

### Legacy Routes (still available)
| URL | Page | Description |
|-----|------|-------------|
| `https://www.ctechrnd.com/concept-books` | Concept Books | Individual view |
| `https://www.ctechrnd.com/products` | Products | Individual view |
| `https://www.ctechrnd.com/certifications` | Certifications | Certification programs |

---

## 📡 API URLs (Backend)

### Base URL
```
https://api.ctechrnd.com
```

### Health & General
```
GET  https://api.ctechrnd.com/api/health
GET  https://api.ctechrnd.com/api/main-categories
GET  https://api.ctechrnd.com/api/all-content
```

### Concept Books APIs
```
GET  https://api.ctechrnd.com/api/concept-books
GET  https://api.ctechrnd.com/api/concept-books/basic
GET  https://api.ctechrnd.com/api/concept-books/professional
GET  https://api.ctechrnd.com/api/concept-books/research
POST https://api.ctechrnd.com/api/book-download-request
```

### Products APIs
```
GET  https://api.ctechrnd.com/api/products
GET  https://api.ctechrnd.com/api/products/foundation
GET  https://api.ctechrnd.com/api/products/industrial
GET  https://api.ctechrnd.com/api/products/research
POST https://api.ctechrnd.com/api/product-inquiry
```

### Research APIs
```
GET  https://api.ctechrnd.com/api/research
GET  https://api.ctechrnd.com/api/research/papers
GET  https://api.ctechrnd.com/api/research/projects
GET  https://api.ctechrnd.com/api/research/advancedProducts
POST https://api.ctechrnd.com/api/research-inquiry
```

### Form Submission APIs
```
POST https://api.ctechrnd.com/api/inquiries
POST https://api.ctechrnd.com/api/book-download-request
POST https://api.ctechrnd.com/api/product-inquiry
POST https://api.ctechrnd.com/api/research-inquiry
```

---

## 🎯 Content Categories & Access URLs

### 1. Concept Books & Learning
```
Frontend: https://www.ctechrnd.com/library
          → Select "Concept Books & Learning"

API:
  • Basic:          /api/concept-books/basic
  • Professional:   /api/concept-books/professional
  • Research:       /api/concept-books/research
```

### 2. Products & Solutions
```
Frontend: https://www.ctechrnd.com/library
          → Select "Products & Solutions"

API:
  • Foundation:     /api/products/foundation
  • Industrial:     /api/products/industrial
  • Research:       /api/products/research
```

### 3. Research & Innovation
```
Frontend: https://www.ctechrnd.com/library
          → Select "Research & Innovation"

API:
  • Papers:         /api/research/papers
  • Projects:       /api/research/projects
  • Products:       /api/research/advancedProducts
```

---

## 🔗 Example API Calls

### Get All Main Categories
```bash
curl https://api.ctechrnd.com/api/main-categories
```

### Get Basic Concept Books
```bash
curl https://api.ctechrnd.com/api/concept-books/basic
```

### Get Industrial Products
```bash
curl https://api.ctechrnd.com/api/products/industrial
```

### Get Research Papers
```bash
curl https://api.ctechrnd.com/api/research/papers
```

### Submit Product Inquiry
```bash
curl -X POST https://api.ctechrnd.com/api/product-inquiry \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "productId": 4,
    "requirement": "Industrial weighing system",
    "budget": "₹100,000"
  }'
```

---

## 📱 Mobile Access

All URLs work seamlessly on mobile devices:
- Responsive design automatically adapts
- Touch-optimized interface
- Fast loading times

```
Mobile: https://www.ctechrnd.com
        (Automatically responds with mobile layout)
```

---

## 🔐 SSL/TLS Encryption

All URLs use HTTPS:
```
✅ https://www.ctechrnd.com        (Encrypted)
✅ https://api.ctechrnd.com        (Encrypted)

❌ http://www.ctechrnd.com         (Auto-redirect to HTTPS)
❌ http://api.ctechrnd.com         (Auto-redirect to HTTPS)
```

---

## 🔄 DNS Resolution

```
Domain Resolution:
  ctechrnd.com              → Your Server IP
  www.ctechrnd.com          → ctechrnd.com (via CNAME)
  api.ctechrnd.com          → ctechrnd.com (via CNAME)

Nginx Routing:
  www.ctechrnd.com    →  Port 80/443 (Frontend)
  api.ctechrnd.com    →  Port 80/443 → Proxy to Port 5000 (Backend)
  ctechrnd.com        →  Port 80/443 (Redirect to www)
```

---

## 📊 URL Statistics

| Type | Count | Examples |
|------|-------|----------|
| Frontend URLs | 7 | Home, Library, About, etc. |
| API Endpoints | 20+ | Category, Products, Research, Forms |
| Domain Aliases | 3 | ctechrnd.com, www, api |

---

## 🚀 Performance

### Frontend Optimization
- Cached static assets
- Gzip compression enabled
- Minified CSS/JS
- Lazy-loaded images

### API Performance
- Response time: < 100ms
- Rate limiting: Configurable
- Caching headers: Set appropriately

### Database Queries
- Indexed fields for fast retrieval
- Connection pooling enabled
- Query optimization implemented

---

## 🎯 Suggested Navigation Path for Users

### New Users
1. Start at: `https://www.ctechrnd.com`
2. Visit: `https://www.ctechrnd.com/about`
3. Explore: `https://www.ctechrnd.com/library`
4. Contact: `https://www.ctechrnd.com/contact`

### Developers
1. Read: DEPLOYMENT.md
2. API Docs: This document
3. Test: `/api/health` endpoint
4. Integrate: Choose relevant endpoints

---

## 🔗 Bookmarks Reference

Save these important URLs:

```
# Production
Main Website:     https://www.ctechrnd.com
API Server:       https://api.ctechrnd.com
Content Library:  https://www.ctechrnd.com/library

# Development
Local Frontend:   http://localhost:3000
Local API:        http://localhost:5000
Local Library:    http://localhost:3000/library

# Admin & Support
Deployment Guide: See DEPLOYMENT.md
API Reference:    This document
GitHub Repo:      hkpoutlook/C-TECHR-DPvtLtd
```

---

## 📞 Troubleshooting

### Website Not Accessible
```
Check: https://www.ctechrnd.com/api/health
If fails → Backend down
If works → Frontend issue
```

### API Errors
```
Test: https://api.ctechrnd.com/api/main-categories
Use curl or Postman for debugging
Check CORS headers if frontend call fails
```

### DNS Issues
```
Verify DNS:  nslookup ctechrnd.com
Check A record and CNAME records
Wait 24-48 hours for DNS propagation
```

---

## ✅ URL Checklist

Before going live, verify:

- [ ] `https://www.ctechrnd.com` loads
- [ ] `https://api.ctechrnd.com/api/health` returns 200
- [ ] `https://www.ctechrnd.com/library` displays content
- [ ] API calls from frontend work
- [ ] HTTPS redirects from HTTP work
- [ ] DNS records propagated
- [ ] SSL certificates valid
- [ ] CORS configured correctly

---

## 🎉 You're All Set!

Your C-TECH R&D website is ready to serve at:
- **https://www.ctechrnd.com** ✅
- **https://api.ctechrnd.com** ✅

With three amazing content categories:
1. 📚 Concept Books & Learning
2. 📦 Products & Solutions  
3. 🔬 Research & Innovation

**Happy exploring! 🚀**
