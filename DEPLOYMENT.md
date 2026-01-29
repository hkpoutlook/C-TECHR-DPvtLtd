# C-TECH R&D Website - Complete Deployment Guide
## 🌐 www.ctechrnd.com

---

## 📋 Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Domain Setup](#domain-setup)
3. [Frontend Deployment](#frontend-deployment)
4. [Backend Deployment](#backend-deployment)
5. [Database Configuration](#database-configuration)
6. [SSL/TLS Setup](#ssltls-setup)
7. [Nginx Reverse Proxy](#nginx-reverse-proxy)
8. [API Endpoints](#api-endpoints)
9. [Website Routes](#website-routes)
10. [Monitoring & Maintenance](#monitoring--maintenance)

---

## 🏗️ Architecture Overview

### Three Main Content Categories (NEW)

```
┌─────────────────────────────────────────────────────────────┐
│                    www.ctechrnd.com                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  1. Concept Books & Learning 📚                              │
│     ├── Basic Conceptual Foundation (Free)                   │
│     ├── Professional Skills (Paid)                           │
│     └── Research-Based Knowledge (Paid)                      │
│                                                               │
│  2. Products & Solutions 📦                                  │
│     ├── Basic Technological Foundation (Free)                │
│     ├── Industrial Level Systems (Paid)                      │
│     └── Research & Advanced Products (Paid)                  │
│                                                               │
│  3. Research & Innovation 🔬                                 │
│     ├── Research Papers & Publications                       │
│     ├── Research Projects & Case Studies                     │
│     └── Research-Level Advanced Products                     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🌐 Domain Setup

### Register Domain
1. Register `ctechrnd.com` at domain registrar (GoDaddy, Namecheap, etc.)
2. Choose hosting provider (AWS, DigitalOcean, Heroku, etc.)

### DNS Records Configuration

```
Type    | Host                | Value                      | TTL
--------|---------------------|----------------------------|-----
A       | ctechrnd.com        | your.server.ip.address    | 3600
CNAME   | www                 | ctechrnd.com              | 3600
CNAME   | api                 | ctechrnd.com              | 3600
MX      | @                   | mail.ctechrnd.com         | 3600
TXT     | @                   | v=spf1 include:...        | 3600
```

**Result:**
- `ctechrnd.com` → Your Server IP
- `www.ctechrnd.com` → Points to ctechrnd.com
- `api.ctechrnd.com` → Points to ctechrnd.com (Nginx routes to backend)

---

## 🎨 Frontend Deployment

### Setup & Build

```bash
# Navigate to frontend directory
cd /workspaces/C-TECHR-DPvtLtd/website/frontend

# Install dependencies
npm install

# Create production environment file
cat > .env.production << EOF
REACT_APP_API_URL=https://api.ctechrnd.com
REACT_APP_SITE_URL=https://www.ctechrnd.com
REACT_APP_ENV=production
EOF

# Build for production
npm run build

# The 'build/' directory is ready for deployment
```

### Deployment to Server

```bash
# Option 1: Copy build folder to server
scp -r build/ user@your-server:/var/www/ctech-frontend/

# Option 2: Use serve package for production
npm install -g serve
serve -s build -l 3000
```

---

## 🔧 Backend Deployment

### Setup & Start

```bash
# Navigate to backend directory
cd /workspaces/C-TECHR-DPvtLtd/website/backend

# Install dependencies
npm install

# Create production environment file
cat > .env << EOF
PORT=5000
NODE_ENV=production
API_URL=https://api.ctechrnd.com
FRONTEND_URL=https://www.ctechrnd.com
CORS_ORIGIN=https://www.ctechrnd.com
DB_HOST=localhost
DB_USER=ctech_user
DB_PASSWORD=your_secure_password
DB_NAME=ctech_production
EOF

# Start backend
npm start
```

### Using PM2 for Process Management

```bash
# Install PM2 globally
npm install -g pm2

# Start backend with PM2
pm2 start server.js --name "ctech-api"

# Auto-start on reboot
pm2 startup
pm2 save

# Monitor
pm2 status
pm2 logs ctech-api
```

---

## 💾 Database Configuration

### MySQL Setup

```bash
# Install MySQL
sudo apt-get install mysql-server

# Secure installation
sudo mysql_secure_installation

# Create database and user
mysql -u root -p << EOF
CREATE DATABASE ctech_production;
CREATE USER 'ctech_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON ctech_production.* TO 'ctech_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
EOF

# Import schema
mysql -u ctech_user -p ctech_production < /workspaces/C-TECHR-DPvtLtd/database/schema.sql

# Import sample data
mysql -u ctech_user -p ctech_production < /workspaces/C-TECHR-DPvtLtd/database/sample_data.sql
```

---

## 🔒 SSL/TLS Setup

### Using Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificates for all domains
sudo certbot certonly --nginx \
  -d ctechrnd.com \
  -d www.ctechrnd.com \
  -d api.ctechrnd.com

# Auto-renewal (verify cron job)
sudo certbot renew --dry-run

# Check certificate status
sudo certbot certificates
```

**Certificate Paths:**
- Certificate: `/etc/letsencrypt/live/ctechrnd.com/fullchain.pem`
- Private Key: `/etc/letsencrypt/live/ctechrnd.com/privkey.pem`

---

## ⚙️ Nginx Reverse Proxy

### Main Configuration File
`/etc/nginx/sites-available/ctechrnd.com`

```nginx
# HTTP to HTTPS Redirect
server {
    listen 80;
    listen [::]:80;
    server_name ctechrnd.com www.ctechrnd.com api.ctechrnd.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS - Main Website
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name ctechrnd.com www.ctechrnd.com;

    # SSL Certificates
    ssl_certificate /etc/letsencrypt/live/ctechrnd.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ctechrnd.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Logging
    access_log /var/log/nginx/ctechrnd-access.log;
    error_log /var/log/nginx/ctechrnd-error.log;

    # Frontend - React Build
    location / {
        root /var/www/ctech-frontend/build;
        try_files $uri $uri/ /index.html;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Cache busting for assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        root /var/www/ctech-frontend/build;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Prevent caching of index.html
    location = /index.html {
        root /var/www/ctech-frontend/build;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}

# HTTPS - API Server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name api.ctechrnd.com;

    # SSL Certificates
    ssl_certificate /etc/letsencrypt/live/ctechrnd.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ctechrnd.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Logging
    access_log /var/log/nginx/api-access.log;
    error_log /var/log/nginx/api-error.log;

    # Proxy to Backend
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

### Enable Configuration

```bash
# Test Nginx configuration
sudo nginx -t

# Create symlink
sudo ln -s /etc/nginx/sites-available/ctechrnd.com /etc/nginx/sites-enabled/

# Restart Nginx
sudo systemctl restart nginx
```

---

## 📡 API Endpoints

### Main Categories
```
GET /api/main-categories
```
Returns all 3 main content categories

### Concept Books
```
GET /api/concept-books
GET /api/concept-books/basic
GET /api/concept-books/professional
GET /api/concept-books/research
POST /api/book-download-request
```

### Products
```
GET /api/products
GET /api/products/foundation
GET /api/products/industrial
GET /api/products/research
POST /api/product-inquiry
```

### Research
```
GET /api/research
GET /api/research/papers
GET /api/research/projects
GET /api/research/advancedProducts
POST /api/research-inquiry
```

### General
```
GET /api/health                    (Health check)
GET /api/all-content               (Complete library)
POST /api/inquiries                (General inquiries)
```

---

## 🗺️ Website Routes

| Route | Component | Status |
|-------|-----------|--------|
| `/` | Home | Landing page |
| `/library` | CategoryView | ✨ New - Unified content |
| `/about` | About | Company info |
| `/concept-books` | ConceptBooks | Legacy view |
| `/products` | Products | Legacy view |
| `/contact` | Contact | Inquiry form |

---

## 📊 Environment Configuration

### Frontend `.env.production`
```
REACT_APP_API_URL=https://api.ctechrnd.com
REACT_APP_SITE_URL=https://www.ctechrnd.com
REACT_APP_ENV=production
```

### Backend `.env`
```
PORT=5000
NODE_ENV=production
API_URL=https://api.ctechrnd.com
FRONTEND_URL=https://www.ctechrnd.com
CORS_ORIGIN=https://www.ctechrnd.com
DB_HOST=localhost
DB_USER=ctech_user
DB_PASSWORD=secure_password_here
DB_NAME=ctech_production
```

---

## 📈 Monitoring & Maintenance

### Health Checks
```bash
# Frontend check
curl https://www.ctechrnd.com

# API health check
curl https://api.ctechrnd.com/api/health

# Backend status
pm2 status
```

### Logs Monitoring
```bash
# Nginx access logs
tail -f /var/log/nginx/ctechrnd-access.log

# Nginx error logs
tail -f /var/log/nginx/ctechrnd-error.log

# Backend logs
pm2 logs ctech-api

# System logs
journalctl -u nginx -f
```

### Backup Strategy
```bash
# Daily database backup (crontab)
0 2 * * * mysqldump -u ctech_user -p'password' ctech_production > /backup/db-$(date +%Y%m%d).sql

# Upload to cloud storage (S3, Google Cloud, etc.)
0 3 * * * aws s3 sync /backup/ s3://ctech-backups/
```

---

## ✅ Pre-Launch Checklist

- [ ] Domain registered and DNS configured
- [ ] SSL certificates obtained and configured
- [ ] Frontend built and deployed
- [ ] Backend running and tested
- [ ] Database created and populated with sample data
- [ ] API endpoints tested and working
- [ ] CORS configured correctly
- [ ] Environment variables set properly
- [ ] Nginx reverse proxy configured
- [ ] Monitoring and logging enabled
- [ ] Backup strategy implemented
- [ ] Performance testing completed
- [ ] Security headers configured
- [ ] CDN setup (optional)
- [ ] Email notifications configured

---

## 🚀 Launch Command Checklist

```bash
# 1. Database
sudo systemctl start mysql

# 2. Backend
cd website/backend
pm2 start server.js --name "ctech-api"

# 3. Nginx
sudo systemctl start nginx

# 4. Verify
pm2 status
systemctl status nginx
curl https://api.ctechrnd.com/api/health
```

---

## 🎉 Success!

Your website is now live at:
- **Frontend**: https://www.ctechrnd.com
- **API**: https://api.ctechrnd.com
- **Content Library**: https://www.ctechrnd.com/library (NEW)

**Content Categories Live:**
1. ✅ Concept Books & Learning
2. ✅ Products & Solutions
3. ✅ Research & Innovation

---

## 📞 Support

For issues or questions, refer to logs and troubleshooting guides in this document.
