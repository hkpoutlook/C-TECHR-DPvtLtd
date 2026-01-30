# C-TECH R&D Website - Visual Architecture Diagrams
## 📊 Complete System Visualization

---

## 1. System Overview Diagram

### Three-Tier Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         PRESENTATION LAYER                          │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐│
│  │                    React Frontend (SPA)                        ││
│  │  ┌──────────────────────────────────────────────────────────┐ ││
│  │  │  Pages:  Home | Library | About | Products | Contact    │ ││
│  │  │                    ⭐ CategoryView (NEW)                  │ ││
│  │  └──────────────────────────────────────────────────────────┘ ││
│  │  ┌──────────────────────────────────────────────────────────┐ ││
│  │  │  Components: Header | Footer | CategoryView              │ ││
│  │  │             | Form Handlers | Content Display            │ ││
│  │  └──────────────────────────────────────────────────────────┘ ││
│  └────────────────────────────────────────────────────────────────┘│
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                        HTTP/HTTPS API
                               │
┌──────────────────────────────▼──────────────────────────────────────┐
│                         API LAYER                                   │
│                    (Express.js Backend)                             │
│  ┌────────────────────────────────────────────────────────────────┐│
│  │  REST API Endpoints:                                           ││
│  │  • /api/concept-books/{level}                                  ││
│  │  • /api/products/{level}                                       ││
│  │  • /api/research/{type}                                        ││
│  │  • /api/inquiries (Form submissions)                           ││
│  └────────────────────────────────────────────────────────────────┘│
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                          SQL Queries
                               │
┌──────────────────────────────▼──────────────────────────────────────┐
│                         DATA LAYER                                  │
│                      (MySQL Database)                               │
│  ┌────────────────────────────────────────────────────────────────┐│
│  │  Tables:                                                       ││
│  │  • main_categories                                             ││
│  │  • concept_books | products | research_content                ││
│  │  • users | inquiries                                           ││
│  └────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Content Category Architecture

### Three Main Categories Structure

```
                    CONTENT LIBRARY
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
    📚 BOOKS        📦 PRODUCTS      🔬 RESEARCH
        │               │               │
        │               │               │
   ┌────┴────┐      ┌────┴────┐      ┌────┴────┐
   │          │      │         │      │         │
   ▼          ▼      ▼         ▼      ▼         ▼
 BASIC   PROF'L   FOUND   INDUST   PAPERS   PROJECTS
 (Free)  (Paid)   (Free)  (Paid)   (Paid)   (Paid)
   │        │       │        │       │        │
   │        │       │        │       │        │
Books   Books   Prod.   Prod.   Papers   Projects
4 each  4 each  3 each  4 each  4 each   4 each


RESEARCH                                ┐
                                        │
        ┌───────────────────────────────┘
        │
        ▼
    ADV PRODUCTS
    (Paid)
        │
        ▼
    Prod.
    4 each
```

### Category Navigation Flow

```
User Visits Library
        │
        ▼
CategoryView Component Renders
        │
        ▼
Display 3 Main Category Cards
    ┌───────────────┬──────────────┬──────────────┐
    │               │              │              │
    ▼               ▼              ▼              ▼
📚 Books        📦 Products     🔬 Research    (User Click)
    │               │              │
    ▼               ▼              ▼
Select Level    Select Level   Select Type
    │               │              │
    │       ┌───────┼────────┐     │
    │       │       │        │     │
    ▼       ▼       ▼        ▼     ▼
  Basic  Found  Indust    Papers  Projects
    │       │       │        │     │
    ▼       ▼       ▼        ▼     ▼
  Fetch API Data
    │
    ▼
Display Content Cards
```

---

## 3. Frontend Component Tree

### Complete Component Hierarchy

```
ROOT
 │
 ├─ App.js
 │  │
 │  ├─ <Header />
 │  │  ├─ Logo
 │  │  ├─ Navigation
 │  │  │  ├─ Home Link
 │  │  │  ├─ Library Link ⭐
 │  │  │  ├─ About Link
 │  │  │  └─ Contact Link
 │  │  └─ Mobile Menu
 │  │
 │  ├─ <BrowserRouter>
 │  │  └─ <Routes>
 │  │     │
 │  │     ├─ Route: "/" → <Home />
 │  │     │
 │  │     ├─ Route: "/library" → <CategoryView /> ⭐ NEW
 │  │     │  └─ Displays:
 │  │     │     ├─ Category Selector
 │  │     │     ├─ Level Selector
 │  │     │     └─ Content Grid
 │  │     │
 │  │     ├─ Route: "/about" → <About />
 │  │     │
 │  │     ├─ Route: "/concept-books" → <ConceptBooks />
 │  │     │
 │  │     ├─ Route: "/products" → <Products />
 │  │     │
 │  │     ├─ Route: "/certifications" → <Certifications />
 │  │     │
 │  │     └─ Route: "/contact" → <Contact />
 │  │        └─ <ContactForm />
 │  │           ├─ Name Input
 │  │           ├─ Email Input
 │  │           ├─ Message Textarea
 │  │           └─ Submit Button
 │  │
 │  └─ <Footer />
 │     ├─ Company Info
 │     ├─ Quick Links
 │     └─ Copyright
 │
 └─ Styles
    ├─ App.css
    ├─ CategoryView.css ⭐ NEW
    └─ Other.css
```

---

## 4. Backend Request Processing Pipeline

### Request to Response Flow

```
REQUEST ARRIVES
    │
    ▼
Nginx Receives (Port 80/443)
    │
    ├─ HTTP → HTTPS Redirect?
    │ └─ Yes → Redirect to HTTPS
    │
    └─ Route Decision
       │
       ├─ www.ctechrnd.com → Static Frontend (Nginx)
       │
       └─ api.ctechrnd.com → Proxy to Backend
           │
           ▼
       Express.js Middleware Chain
           │
           ├─ CORS Check
           │  └─ Verify Origin Header
           │
           ├─ Body Parser
           │  └─ Parse JSON/Form Data
           │
           ├─ Request Logger
           │  └─ Log to Console
           │
           ▼
       Route Matching
           │
           ├─ GET /api/health?
           │  └─ Return { status: running }
           │
           ├─ GET /api/concept-books/:level?
           │  └─ Extract 'level' parameter
           │     └─ Retrieve from books[level]
           │        └─ Return array
           │
           ├─ GET /api/products/:level?
           │  └─ Extract 'level' parameter
           │     └─ Retrieve from products[level]
           │        └─ Return array
           │
           ├─ GET /api/research/:type?
           │  └─ Extract 'type' parameter
           │     └─ Retrieve from research[type]
           │        └─ Return object
           │
           ├─ POST /api/inquiries?
           │  └─ Receive form data
           │     └─ Validate input
           │        └─ Log to console
           │           └─ Return success
           │
           └─ No match?
              └─ Error 404 Response
              
       RESPONSE GENERATION
           │
           ├─ Format JSON
           ├─ Add Headers
           └─ Set HTTP Status (200, 404, etc.)
           │
           ▼
       Send Response
           │
           ▼
       FRONTEND RECEIVES
           │
           ├─ Parse JSON
           ├─ Update State
           └─ Re-render Component
```

---

## 5. Database Schema Relationship Diagram

### ER Diagram (Entity-Relationship)

```
┌─────────────────────────┐
│   main_categories       │
├─────────────────────────┤
│ id (PK)                 │ 1 ╱───────────┐
│ name (UNIQUE)           │   │           │
│ icon                    │   │ Many      │ Many
│ color                   │   │           │
│ description             │   │           │
│ created_at              │   │           │
└─────────────────────────┘   │           │
          ▲                    │           │
          │                    │           │
          │            ┌───────┴────┐  ┌──┴───────┐
          │            │            │  │          │
          │            ▼            ▼  ▼          ▼
          │      ┌──────────────┐ ┌──────────┐ ┌──────────┐
          │      │concept_books │ │products  │ │research  │
          │      ├──────────────┤ ├──────────┤ │_content  │
          │      │id (PK)       │ │id (PK)   │ ├──────────┤
          └──────│level         │ │level     │ │id (PK)   │
                 │title         │ │name      │ │type      │
                 │author        │ │price     │ │category  │
                 │access_type   │ │type      │ │author    │
                 │pages         │ │access    │ │status    │
                 │price         │ │specs     │ │year      │
                 │created_at    │ │created_at│ │created_at│
                 └──────────────┘ └──────────┘ └──────────┘


┌──────────────┐              1
│   users      │ ──────────────────────── Many
├──────────────┤                          │
│id (PK)       │                          │
│name          │                    ┌─────▼──────┐
│email(UNIQUE) │                    │ inquiries  │
│phone         │                    ├────────────┤
│created_at    │                    │id (PK)     │
└──────────────┘                    │user_name   │
                                    │user_email  │
                                    │category    │
                                    │message     │
                                    │status      │
                                    │created_at  │
                                    └────────────┘
```

---

## 6. API Endpoint Map

### RESTful API Architecture

```
BASE URL: https://api.ctechrnd.com/api

┌─ General Endpoints
│  ├─ GET /health                    → { status, timestamp }
│  └─ GET /main-categories           → [Categories]
│
├─ Concept Books Endpoints
│  ├─ GET /concept-books             → All books by level
│  ├─ GET /concept-books/:level      → Books for level
│  │  ├─ :level = "basic"
│  │  ├─ :level = "professional"
│  │  └─ :level = "research"
│  │
│  └─ POST /book-download-request    ← { name, email, bookId }
│
├─ Products Endpoints
│  ├─ GET /products                  → All products by level
│  ├─ GET /products/:level           → Products for level
│  │  ├─ :level = "foundation"
│  │  ├─ :level = "industrial"
│  │  └─ :level = "research"
│  │
│  └─ POST /product-inquiry          ← { name, email, productId }
│
├─ Research Endpoints
│  ├─ GET /research                  → All research by type
│  ├─ GET /research/:type            → Research for type
│  │  ├─ :type = "papers"
│  │  ├─ :type = "projects"
│  │  └─ :type = "advancedProducts"
│  │
│  └─ POST /research-inquiry         ← { name, email, type }
│
└─ Form Submission Endpoints
   ├─ POST /inquiries                ← { name, email, category, message }
   ├─ POST /book-download-request    ← { ... }
   ├─ POST /product-inquiry          ← { ... }
   ├─ POST /research-inquiry         ← { ... }
   └─ POST /certification-inquiry    ← { ... }
```

---

## 7. Deployment Architecture

### Production Environment Layout

```
┌────────────────────────────────────────────────────────────────────┐
│                        INTERNET / DNS                              │
│                  ctechrnd.com | www | api                         │
└────────────────────────────────┬─────────────────────────────────┘
                                 │
                        ┌────────▼────────┐
                        │  SSL/TLS Cert.  │
                        │  Let's Encrypt  │
                        └────────┬────────┘
                                 │
    ┌────────────────────────────┼────────────────────────────┐
    │                            │                            │
┌───▼────────┐         ┌─────────▼──────────┐         ┌──────▼─────┐
│   Nginx    │         │   Reverse Proxy    │         │  SSL/TLS   │
│ Port 80    │         │   Certificates     │         │  Termination
│ Port 443   │         │   & Routing        │         │            │
└───┬────────┘         └────────┬───────────┘         └────────────┘
    │                           │
    │        ┌──────────────────┼──────────────────┐
    │        │                  │                  │
    ▼        ▼                  ▼                  ▼
 www.ct   ctechrnd          api.ctechrnd    (Redirects)
 echrnd   (redirect)           │
 .com       │                   │
    │       │                   ▼
    │       └──────────▶ Frontend    Backend
    │                  │            │
    │                  ▼            ▼
    │              React SPA     Node.js +
    │              Port 3000     Express.js
    │              (Served       Port 5000
    │               by Nginx)    (Proxied)
    │                            │
    └────────────────┬───────────┘
                     │
            ┌────────▼────────┐
            │   MySQL DB      │
            │   Database      │
            │   localhost:3306│
            │                 │
            │  ctech_prod     │
            │  (Data Store)   │
            └─────────────────┘
```

### Service Architecture

```
┌─────────────────────────────────┐
│    Nginx Web Server             │
│  • Reverse Proxy                │
│  • SSL/TLS Termination          │
│  • Static File Serving          │
│  • Load Balancing (future)      │
└──────────────┬──────────────────┘
               │
    ┌──────────┴──────────┐
    │                     │
    ▼                     ▼
┌─────────────┐   ┌──────────────────┐
│  Frontend   │   │    Backend       │
│             │   │                  │
│ React App   │   │ Express.js       │
│ Static      │   │ Node.js          │
│ Build       │   │ Port: 5000       │
│             │   │                  │
│ /var/www    │   │ Process Manager  │
│ /build      │   │ PM2 managed      │
└─────────────┘   └────────┬─────────┘
                           │
                           ▼
                   ┌──────────────────┐
                   │   MySQL DB       │
                   │                  │
                   │ Database Server  │
                   │ Port: 3306       │
                   │                  │
                   │ Backups to cloud │
                   │ (Daily)          │
                   └──────────────────┘
```

---

## 8. Data Flow Sequences

### Complete User Journey

```
1. USER OPENS WEBSITE
   Browser → DNS Lookup (ctechrnd.com)
       ↓
   Browser → TCP Connection to Server
       ↓
   Browser → TLS Handshake
       ↓
   Browser ← SSL Certificate (Valid)
       ↓
   Encrypted HTTPS Connection Established
       ↓

2. USER LOADS HOME PAGE
   Browser → GET / (HTTPS)
       ↓
   Nginx → Serves /var/www/ctech-frontend/build/index.html
       ↓
   Browser ← React App (bundle.js, index.html, styles)
       ↓
   React Initializes & Renders Home Page
       ↓

3. USER CLICKS "LIBRARY"
   Click Event → Router.navigate('/library')
       ↓
   CategoryView Component Mounts
       ↓
   Display 3 Category Cards
       ↓

4. USER SELECTS "Concept Books"
   Click Event → setActiveCategory('conceptBooks')
       ↓
   Display Level Options
       ↓

5. USER SELECTS "Basic"
   Click Event → setActiveLevel('basic')
       ↓
   axios.get('https://api.ctechrnd.com/api/concept-books/basic')
       ↓
   Browser → GET /api/concept-books/basic (HTTPS)
       ↓
   Nginx (api.ctechrnd.com) → Proxy to localhost:5000
       ↓
   Express.js → Route Handler (app.get('/api/concept-books/:level'))
       ↓
   Handler → Extract 'basic' from params
       ↓
   Handler → Look up books['basic'] in memory
       ↓
   Handler → Format JSON response
       ↓
   Browser ← 200 OK + JSON Data
       ↓
   React → Parse Response
       ↓
   React → setContent(response.data)
       ↓
   Component → Re-render with Book Cards
       ↓
   User → See 4 Basic Concept Books with Details
```

---

## 9. Caching & Performance Strategy

### Frontend Caching Strategy

```
Browser Cache Headers (from Nginx)
    │
    ├─ index.html
    │  └─ Cache-Control: no-cache, no-store, must-revalidate
    │     (Always fetch fresh)
    │
    ├─ CSS & JS (with hash)
    │  ├─ app.abc123.js
    │  ├─ app.abc123.css
    │  └─ Cache-Control: public, max-age=31536000 (1 year)
    │     (Never change unless hash changes)
    │
    ├─ Images & Assets
    │  └─ Cache-Control: public, max-age=2592000 (30 days)
    │
    └─ API Responses
       └─ Cache-Control: no-cache (Always fresh)
          (Dynamic data from backend)
```

### Backend Response Caching (Future)

```
Request for /api/concept-books/basic
    │
    ├─ Check Redis Cache
    │  ├─ Cache HIT?
    │  │  └─ Return cached response (instant)
    │  │
    │  └─ Cache MISS?
    │     │
    │     ├─ Get from Memory (books.basic)
    │     ├─ Format Response
    │     ├─ Store in Redis (TTL: 1 hour)
    │     └─ Return Response
    │
    └─ Client Receives Response (with headers)
       └─ X-Cache: HIT or MISS
```

---

## 10. Monitoring & Logging Architecture

### System Monitoring Points

```
┌─────────────────────────────────────────────────┐
│          MONITORING & OBSERVABILITY              │
├─────────────────────────────────────────────────┤
│                                                 │
│  Frontend Monitoring                            │
│  ├─ Browser Console Logs                       │
│  ├─ Error Tracking (Sentry)                    │
│  ├─ Performance Metrics (Web Vitals)           │
│  ├─ User Analytics (Google Analytics)          │
│  └─ Network Requests (Axios interceptors)      │
│                                                 │
│  Backend Monitoring                            │
│  ├─ Console Logs (custom)                      │
│  ├─ PM2 Logs (pm2 logs)                        │
│  ├─ System Logs (journalctl)                   │
│  ├─ Response Times                             │
│  └─ Error Tracking                             │
│                                                 │
│  Nginx Monitoring                              │
│  ├─ Access Logs (/var/log/nginx/access.log)   │
│  ├─ Error Logs (/var/log/nginx/error.log)     │
│  ├─ Connection Status                         │
│  └─ SSL Certificate Expiry                    │
│                                                 │
│  Database Monitoring                           │
│  ├─ Query Performance                         │
│  ├─ Connection Pool Status                    │
│  ├─ Backup Verification                       │
│  └─ Disk Space Usage                          │
│                                                 │
│  System Monitoring                             │
│  ├─ CPU Usage                                 │
│  ├─ Memory Usage                              │
│  ├─ Disk Usage                                │
│  ├─ Network I/O                               │
│  └─ Uptime (UptimeRobot)                      │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Summary

This architecture provides:

✅ **Scalable** - Horizontal scaling ready
✅ **Secure** - HTTPS/TLS, CORS, Input validation
✅ **Performant** - Caching, compression, optimization
✅ **Maintainable** - Clear separation of concerns
✅ **Extensible** - Easy to add new features
✅ **Monitoring** - Comprehensive logging & observability

**All diagrams created:** January 29, 2026
**Architecture Version:** 2.0
**Status:** Production Ready ✅
