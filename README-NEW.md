# C-TECH R&D - Website Platform
## 🌐 www.ctechrnd.com

Advanced research and instrumentation solutions platform with three integrated content categories.

---

## 📦 What's Inside

```
C-TECHR-DPvtLtd/
├── website/
│   ├── frontend/                    # React 18.2 - User Interface
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── CategoryView.js     # ✨ NEW - Unified content display
│   │   │   │   ├── Header.js
│   │   │   │   └── Footer.js
│   │   │   ├── pages/
│   │   │   ├── styles/
│   │   │   │   └── CategoryView.css    # ✨ NEW - Styling
│   │   │   ├── config/
│   │   │   │   └── api.js             # API configuration
│   │   │   └── App.js
│   │   └── package.json
│   │
│   └── backend/                     # Express.js - REST API
│       ├── server.js                # ✨ UPDATED - Three-category structure
│       └── package.json
│
├── database/
│   ├── schema.sql                   # Database structure
│   └── sample_data.sql              # Sample content
│
├── DEPLOYMENT.md                    # ✨ Complete deployment guide
├── quick-start.sh                   # ✨ Quick setup script
└── README.md                        # This file
```

---

## 🎯 Three Content Categories

### 1. 📚 Concept Books & Learning
**From Basics to Research-Level Knowledge**

- **Basic**: Foundational concepts (FREE)
  - Foundations of Electronics & Measurement
  - Sensor Basics for Engineers
  - Understanding Signals
  - Measurement Fundamentals

- **Professional**: Applied skills (PAID)
  - Practical Instrumentation System Design
  - Embedded Systems for Industrial Applications
  - Sensor Signal Conditioning
  - Industrial Communication Protocols

- **Research**: Advanced knowledge (PAID)
  - Advanced Precision Measurement Systems
  - R&D Engineering: From Problem to Innovation
  - Intelligent Sensors & AI-Assisted Instrumentation
  - Advanced Signal Processing & Analysis

**Access**: `/library` → Select "Concept Books & Learning"

---

### 2. 📦 Products & Solutions
**Hardware and Integrated Solutions**

- **Foundation**: Basic technology (FREE)
  - Sensor Demonstration Kit
  - Basic Measurement Trainer
  - Signal Analysis Workbench

- **Industrial**: Production systems (PAID)
  - Precision Weight Measurement System
  - Dynamic Checkweigher Controller
  - Industrial DAQ System
  - Metal Detection & Weight Integration

- **Research**: Advanced R&D systems (PAID)
  - AI-Assisted Metal Detection System
  - Advanced Dynamic Measurement Platform
  - Intelligent Sensor Fusion System
  - Quantum Sensor Integration Suite

**Access**: `/library` → Select "Products & Solutions"

---

### 3. 🔬 Research & Innovation
**Research Papers and Advanced Projects**

- **Papers**: Peer-reviewed publications
  - High-Precision Load Cell Characterization Using AI
  - Real-Time Signal Processing in Industrial IoT
  - Sensor Fusion for Enhanced Measurement Accuracy
  - Machine Learning in Instrumentation Systems

- **Projects**: Case studies and research initiatives
  - Precision Measurement in Pharmaceutical Manufacturing
  - AI-Based Quality Control System Development
  - Real-Time Sensor Health Monitoring
  - IoT Integration for Multi-Factory Monitoring

- **Advanced Products**: Experimental systems
  - Ultra-Low-Noise Amplifier Suite
  - Multi-Channel Precision DAQ
  - Quantum Sensor Development Kit
  - AI-ML Integration Platform

**Access**: `/library` → Select "Research & Innovation"

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm 8+
- MySQL 5.7+ (for production)

### Development Setup

```bash
# Make setup script executable
chmod +x quick-start.sh

# Run setup
./quick-start.sh
```

Or manually:

```bash
# Install frontend
cd website/frontend
npm install
npm start

# Install backend (in another terminal)
cd website/backend
npm install
npm start
```

### Access Locally
- **Frontend**: http://localhost:3000
- **API**: http://localhost:5000
- **Content Library**: http://localhost:3000/library

---

## 📡 API Endpoints

### Main Categories
```
GET /api/main-categories
```

### Concept Books
```
GET /api/concept-books
GET /api/concept-books/basic
GET /api/concept-books/professional
GET /api/concept-books/research
```

### Products
```
GET /api/products
GET /api/products/foundation
GET /api/products/industrial
GET /api/products/research
```

### Research
```
GET /api/research
GET /api/research/papers
GET /api/research/projects
GET /api/research/advancedProducts
```

### Utilities
```
GET /api/health                 # Health check
GET /api/all-content            # Complete library
POST /api/inquiries             # Submit inquiry
```

---

## 🗺️ Website Navigation

| Route | Purpose |
|-------|---------|
| `/` | Home page |
| `/library` | **New unified content library** |
| `/about` | Company information |
| `/concept-books` | Legacy concept books view |
| `/products` | Legacy products view |
| `/contact` | Contact & inquiry form |

---

## 🔐 Environment Variables

### Frontend (`.env`)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SITE_URL=http://localhost:3000
REACT_APP_ENV=development
```

### Backend (`.env`)
```
PORT=5000
NODE_ENV=development
API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000
```

---

## 📚 Database

### Setup
```bash
# Create database
mysql -u root -p < database/schema.sql

# Import sample data
mysql -u root -p < database/sample_data.sql
```

### Tables
- `main_categories` - Content categories
- `concept_books` - Learning materials
- `products` - Hardware solutions
- `research_content` - Research papers & projects
- `users` - User information
- `inquiries` - User inquiries

---

## 🚀 Production Deployment

### Complete Guide
See [DEPLOYMENT.md](DEPLOYMENT.md) for:
- Domain setup
- SSL/TLS configuration
- Nginx reverse proxy setup
- Database configuration
- Monitoring & maintenance
- Health checks

### Quick Deploy
```bash
# Build frontend
cd website/frontend
npm run build

# Start backend with PM2
cd website/backend
pm2 start server.js --name "ctech-api"

# Configure Nginx (see DEPLOYMENT.md)
sudo systemctl restart nginx
```

---

## 🛠️ Technology Stack

### Frontend
- **React 18.2** - UI framework
- **React Router 6** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling

### Backend
- **Express.js 4.18** - Web framework
- **CORS** - Cross-origin support
- **Body Parser** - Request parsing
- **Dotenv** - Environment management

### Database
- **MySQL 5.7+** - Data storage

### Hosting
- **Nginx** - Reverse proxy
- **Let's Encrypt** - SSL certificates
- **PM2** - Process management

---

## 📊 Features

✅ **Three Integrated Content Categories**
- Concept Books with multiple access levels
- Products with technology progression
- Research with publications and projects

✅ **Responsive Design**
- Mobile-friendly interface
- Adaptive layouts
- Touch-optimized components

✅ **RESTful API**
- Category-based endpoints
- JSON responses
- CORS enabled

✅ **Secure**
- HTTPS/TLS encryption
- CORS protection
- Input validation

✅ **Scalable**
- Modular architecture
- Database-driven content
- Load-balancer ready

---

## 📝 Recent Updates

### Version 2.0 - New Architecture
- ✨ Unified three-category content structure
- ✨ New CategoryView component
- ✨ Reorganized backend API endpoints
- ✨ Updated database schema
- ✨ Comprehensive deployment guide
- ✨ Quick start script

---

## 🤝 Support & Issues

For issues or questions:
1. Check [DEPLOYMENT.md](DEPLOYMENT.md) troubleshooting section
2. Review API endpoints documentation
3. Check browser console for errors
4. Review backend logs with `pm2 logs`

---

## 📄 License

Copyright © 2024 C-TECH R&D. All rights reserved.

---

## 🌐 Live Website

- **Production**: https://www.ctechrnd.com
- **API**: https://api.ctechrnd.com
- **Content Library**: https://www.ctechrnd.com/library

---

**Happy Coding! 🚀**
