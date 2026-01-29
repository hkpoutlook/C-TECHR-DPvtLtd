# C-TECH R&D Website - Complete Documentation Index
## 📚 All Documentation & Resources

---

## 🎯 Quick Navigation

### For Different Roles

**👨‍💼 Project Manager**
- Read: [README-NEW.md](README-NEW.md) - Project Overview
- Check: [ARCHITECTURE.md](ARCHITECTURE.md) - System Design
- Review: [URL-REFERENCE.md](URL-REFERENCE.md) - Website URLs

**👨‍💻 Frontend Developer**
- Start: [README-NEW.md](README-NEW.md#frontend-stack)
- Build: Frontend directory structure
- Reference: [ARCHITECTURE.md#frontend-architecture](ARCHITECTURE.md#frontend-architecture)
- Deploy: [DEPLOYMENT.md#frontend-deployment](DEPLOYMENT.md#frontend-deployment)

**🔧 Backend Developer**
- Start: [README-NEW.md](README-NEW.md#backend-stack)
- Code: Backend directory structure
- Reference: [ARCHITECTURE.md#backend-architecture](ARCHITECTURE.md#backend-architecture)
- Deploy: [DEPLOYMENT.md#backend-deployment](DEPLOYMENT.md#backend-deployment)

**🗄️ Database Administrator**
- Schema: [database/schema.sql](database/schema.sql)
- Data: [database/sample_data.sql](database/sample_data.sql)
- Reference: [ARCHITECTURE.md#database-architecture](ARCHITECTURE.md#database-architecture)
- Setup: [DEPLOYMENT.md#database-configuration](DEPLOYMENT.md#database-configuration)

**🚀 DevOps Engineer**
- Deployment: [DEPLOYMENT.md](DEPLOYMENT.md) - Complete guide
- Architecture: [ARCHITECTURE.md#deployment-architecture](ARCHITECTURE.md#deployment-architecture)
- Nginx: [DEPLOYMENT.md#nginx-reverse-proxy](DEPLOYMENT.md#nginx-reverse-proxy)
- Monitoring: [ARCHITECTURE.md#monitoring--logging-architecture](ARCHITECTURE.md#monitoring--logging-architecture)

**📊 API Developer / Integration**
- API Reference: [URL-REFERENCE.md](URL-REFERENCE.md)
- Endpoints: [ARCHITECTURE.md#api-design](ARCHITECTURE.md#api-design)
- Examples: [URL-REFERENCE.md#example-api-calls](URL-REFERENCE.md#example-api-calls)

---

## 📋 Documentation Files

### Core Documentation

| File | Purpose | Audience |
|------|---------|----------|
| [README.md](README.md) | Original project README | Everyone |
| [README-NEW.md](README-NEW.md) | ✨ Updated with 3-category model | Everyone |
| [ARCHITECTURE.md](ARCHITECTURE.md) | ✨ Complete system architecture | Technical |
| [ARCHITECTURE-DIAGRAMS.md](ARCHITECTURE-DIAGRAMS.md) | ✨ Visual diagrams & flows | Technical |
| [DEPLOYMENT.md](DEPLOYMENT.md) | ✨ Production deployment guide | DevOps/Backend |
| [URL-REFERENCE.md](URL-REFERENCE.md) | ✨ All website & API URLs | Developers |

### Database Files

| File | Purpose |
|------|---------|
| [database/schema.sql](database/schema.sql) | Database schema (3 main tables) |
| [database/sample_data.sql](database/sample_data.sql) | Sample data for development |

### Code Structure

| Location | Purpose |
|----------|---------|
| [website/frontend/](website/frontend/) | React SPA Application |
| [website/backend/server.js](website/backend/server.js) | Express.js REST API |
| [website/frontend/src/components/CategoryView.js](website/frontend/src/components/CategoryView.js) | ✨ New unified content view |
| [website/frontend/src/config/api.js](website/frontend/src/config/api.js) | ✨ API helper functions |

### Configuration Files

| File | Purpose |
|------|---------|
| [quick-start.sh](quick-start.sh) | ✨ Automated setup script |
| [website/frontend/.env](website/frontend/.env) | Frontend environment (dev) |
| [website/frontend/.env.production](website/frontend/.env.production) | Frontend environment (prod) |
| [website/backend/.env](website/backend/.env) | Backend environment |
| [.gitignore](.gitignore) | Git ignore rules |

---

## 🏗️ Architecture Overview

### Three Content Categories

```
Website
├── 📚 Concept Books & Learning
│   ├── Basic (Free)
│   ├── Professional (Paid)
│   └── Research-Based (Paid)
│
├── 📦 Products & Solutions
│   ├── Foundation/Basic (Free)
│   ├── Industrial Level (Paid)
│   └── Advanced R&D (Paid)
│
└── 🔬 Research & Innovation
    ├── Research Papers
    ├── Research Projects
    └── Advanced Products
```

### Technology Stack

**Frontend:**
- React 18.2.0
- React Router 6.20.1
- Axios 1.6.5
- CSS3

**Backend:**
- Express.js 4.18.2
- Node.js 16+
- CORS, Body Parser, Dotenv

**Database:**
- MySQL 5.7+

**Deployment:**
- Nginx (reverse proxy)
- Let's Encrypt (SSL)
- PM2 (process management)
- Linux (Ubuntu 20.04+)

---

## 🚀 Getting Started

### Quick Start (5 minutes)

```bash
# Run automated setup
chmod +x quick-start.sh
./quick-start.sh

# In Terminal 1 - Frontend
cd website/frontend
npm start  # http://localhost:3000

# In Terminal 2 - Backend
cd website/backend
npm start  # http://localhost:5000
```

Access:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:5000
- **Content Library**: http://localhost:3000/library ⭐

### Detailed Setup
See [DEPLOYMENT.md#deployment-steps](DEPLOYMENT.md#deployment-steps)

---

## 📡 API Documentation

### Base URL (Production)
```
https://api.ctechrnd.com/api
```

### Main Endpoints

**Categories**
```
GET /main-categories          # All 3 categories
```

**Concept Books**
```
GET /concept-books            # All books
GET /concept-books/basic      # Basic level
GET /concept-books/professional  # Professional
GET /concept-books/research   # Research
```

**Products**
```
GET /products                 # All products
GET /products/foundation      # Foundation level
GET /products/industrial      # Industrial
GET /products/research        # Advanced R&D
```

**Research**
```
GET /research                 # All research
GET /research/papers          # Papers
GET /research/projects        # Projects
GET /research/advancedProducts # Products
```

**Forms**
```
POST /inquiries               # General inquiry
POST /book-download-request   # Book request
POST /product-inquiry         # Product inquiry
POST /research-inquiry        # Research inquiry
```

Full details: [URL-REFERENCE.md](URL-REFERENCE.md)

---

## 🌐 Website URLs

### Production URLs

| URL | Purpose |
|-----|---------|
| https://www.ctechrnd.com | Main website |
| https://www.ctechrnd.com/library | ✨ Content library |
| https://api.ctechrnd.com | REST API |

### Local Development URLs

| URL | Purpose |
|-----|---------|
| http://localhost:3000 | Frontend |
| http://localhost:5000 | Backend API |
| http://localhost:3000/library | ✨ Content library |

Full URL reference: [URL-REFERENCE.md](URL-REFERENCE.md)

---

## 📊 Database Structure

### Main Tables

1. **main_categories** - Content categories
2. **concept_books** - Learning materials
3. **products** - Hardware solutions
4. **research_content** - Research papers & projects
5. **users** - User information
6. **inquiries** - Form submissions

View full schema: [database/schema.sql](database/schema.sql)

---

## 🎯 Key Features

✨ **NEW in v2.0:**
- Three-category unified content structure
- CategoryView component for browsing
- Comprehensive API endpoints
- Complete deployment guide
- Visual architecture diagrams
- URL reference documentation

✅ **Existing Features:**
- Responsive React frontend
- RESTful API backend
- MySQL database
- SSL/TLS encryption
- Nginx reverse proxy
- PM2 process management

---

## 🔐 Security Features

- **HTTPS/TLS** - Encrypted connections
- **CORS** - Cross-origin protection
- **Input Validation** - Server-side validation
- **SSL Certificates** - Let's Encrypt (auto-renewal)
- **Security Headers** - Strict-Transport-Security, X-Content-Type-Options

See: [ARCHITECTURE.md#security-architecture](ARCHITECTURE.md#security-architecture)

---

## 📈 Deployment Checklist

### Pre-Launch

- [ ] Domain registered (ctechrnd.com)
- [ ] Hosting provider selected
- [ ] SSL certificates configured
- [ ] Database created
- [ ] Environment variables set
- [ ] Backend tested
- [ ] Frontend built
- [ ] Nginx configured
- [ ] DNS records updated
- [ ] Monitoring setup

### Post-Launch

- [ ] Health checks passing
- [ ] API endpoints working
- [ ] Frontend loading correctly
- [ ] HTTPS redirects working
- [ ] Backups configured
- [ ] Logs monitoring active
- [ ] Performance baseline set

See: [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 🛠️ Development Workflow

### Making Changes

1. **Pull latest code**
   ```bash
   git pull origin main
   ```

2. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature
   ```

3. **Make changes & test**
   - Frontend: `npm start` in frontend directory
   - Backend: `npm start` in backend directory
   - Test at http://localhost:3000

4. **Commit changes**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

5. **Push to GitHub**
   ```bash
   git push origin feature/your-feature
   ```

6. **Create Pull Request**
   - On GitHub, create PR to main branch
   - Request review if needed
   - Merge when approved

---

## 📞 Support & Troubleshooting

### Common Issues

**Frontend won't start**
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

**Backend port already in use**
```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

**Database connection error**
- Check MySQL is running: `systemctl status mysql`
- Verify credentials in `.env`
- Check database exists: `mysql -u user -p -e "SHOW DATABASES;"`

**API not responding**
- Check backend: `pm2 status`
- Check logs: `pm2 logs ctech-api`
- Test endpoint: `curl http://localhost:5000/api/health`

Full troubleshooting: [DEPLOYMENT.md#troubleshooting](DEPLOYMENT.md#troubleshooting)

---

## 📚 Learning Resources

### Frontend Development
- [React Documentation](https://react.dev)
- [React Router Guide](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)

### Backend Development
- [Express.js Guide](https://expressjs.com)
- [Node.js Documentation](https://nodejs.org/docs)
- [RESTful API Design](https://restfulapi.net)

### Database
- [MySQL Documentation](https://dev.mysql.com/doc)
- [SQL Tutorial](https://www.w3schools.com/sql)

### Deployment
- [Nginx Documentation](https://nginx.org/en/docs)
- [Let's Encrypt Guide](https://letsencrypt.org/getting-started)
- [PM2 Documentation](https://pm2.keymetrics.io)

---

## 🎓 Project Structure Map

```
C-TECHR-DPvtLtd/
├── 📄 Documentation
│   ├── README.md                    # Original README
│   ├── README-NEW.md                # ✨ Updated README
│   ├── ARCHITECTURE.md              # ✨ System architecture
│   ├── ARCHITECTURE-DIAGRAMS.md     # ✨ Visual diagrams
│   ├── DEPLOYMENT.md                # ✨ Deployment guide
│   ├── URL-REFERENCE.md             # ✨ URL reference
│   └── INDEX.md                     # ✨ This file
│
├── 🗂️ Website Code
│   └── website/
│       ├── frontend/
│       │   ├── src/
│       │   │   ├── components/
│       │   │   │   ├── CategoryView.js        # ✨ NEW
│       │   │   │   ├── Header.js
│       │   │   │   └── Footer.js
│       │   │   ├── pages/
│       │   │   ├── styles/
│       │   │   │   └── CategoryView.css       # ✨ NEW
│       │   │   ├── config/
│       │   │   │   └── api.js                 # ✨ NEW
│       │   │   ├── App.js
│       │   │   └── index.js
│       │   ├── public/
│       │   ├── .env
│       │   ├── .env.production
│       │   └── package.json
│       │
│       └── backend/
│           ├── server.js            # ✨ UPDATED
│           ├── .env
│           └── package.json
│
├── 💾 Database
│   ├── schema.sql                   # ✨ Updated schema
│   └── sample_data.sql              # ✨ Sample data
│
├── 🚀 Deployment
│   ├── quick-start.sh               # ✨ Setup script
│   └── .gitignore
│
└── 📋 Configuration
    ├── .env.production
    └── DEPLOYMENT.md
```

---

## ✅ Verification Checklist

### After Setup

- [ ] Frontend runs at http://localhost:3000
- [ ] Backend runs at http://localhost:5000
- [ ] API returns data from /api/concept-books/basic
- [ ] Library page displays content
- [ ] Form submission works
- [ ] All routes accessible
- [ ] No console errors

### Before Deployment

- [ ] All tests passing
- [ ] Code reviewed
- [ ] Environment variables configured
- [ ] Database initialized
- [ ] SSL certificates ready
- [ ] Nginx configured
- [ ] DNS records updated
- [ ] Backup strategy implemented

---

## 📞 Quick Help

### I want to...

**...add a new product**
- Edit: [website/backend/server.js](website/backend/server.js) (products object)
- Or: Insert into database (products table)
- Frontend auto-fetches on page load

**...modify the library page**
- Edit: [website/frontend/src/components/CategoryView.js](website/frontend/src/components/CategoryView.js)
- Or: [website/frontend/src/styles/CategoryView.css](website/frontend/src/styles/CategoryView.css)

**...add a new route**
- Frontend: Edit [website/frontend/src/App.js](website/frontend/src/App.js)
- Backend: Edit [website/backend/server.js](website/backend/server.js)

**...deploy to production**
- Follow: [DEPLOYMENT.md](DEPLOYMENT.md)
- Takes about 1-2 hours including setup

**...check what's new**
- Read: [README-NEW.md](README-NEW.md)
- Look for: ✨ symbols in documentation

---

## 📈 Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | Jan 29, 2026 | ✨ Three-category model, new components, full documentation |
| 1.0 | Earlier | Original website structure |

---

## 🎉 Summary

You now have:

✅ **Complete Website** - Frontend, Backend, Database
✅ **Three Content Categories** - Unified structure
✅ **Production Ready** - Deployment guide included
✅ **Full Documentation** - Architecture, APIs, URLs
✅ **Quick Start** - Setup script for instant start
✅ **Visual Diagrams** - System architecture visualizations

Everything is ready to:
- 🚀 **Deploy** - Follow DEPLOYMENT.md
- 🔧 **Develop** - Use quick-start.sh
- 📚 **Learn** - Read ARCHITECTURE.md
- 🌐 **Integrate** - Check URL-REFERENCE.md

---

## 📞 Support

For questions or issues:
1. Check relevant documentation file
2. Review troubleshooting section
3. Check backend logs: `pm2 logs ctech-api`
4. Check frontend console: Browser DevTools

---

**Documentation Complete** ✅
**Last Updated:** January 29, 2026
**Status:** Ready for Production

Enjoy building! 🚀
