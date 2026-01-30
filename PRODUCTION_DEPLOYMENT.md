# Production Deployment Guide
## C-TECH Research & Development Pvt. Ltd.
## ctechrnd.com - Complete Platform Deployment

---

## 📋 Prerequisites

- Ubuntu 24.04 LTS or similar Linux server
- Domain names (www.ctechrnd.com, api.ctechrnd.com)
- SSH access to server
- Stripe account with API keys
- PayPal account with API credentials
- MySQL database access

---

## 🔧 Step 1: Server Setup

### 1.1 Update System
```bash
sudo apt update
sudo apt upgrade -y
```

### 1.2 Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v
```

### 1.3 Install MySQL (if needed)
```bash
sudo apt install -y mysql-server
sudo mysql_secure_installation
```

### 1.4 Install Nginx
```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 1.5 Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
pm2 startup
pm2 save
```

### 1.6 Install Certbot (SSL Certificates)
```bash
sudo apt install -y certbot python3-certbot-nginx
```

---

## 📦 Step 2: Deploy Application

### 2.1 Clone Repository
```bash
cd /var/www
sudo git clone https://github.com/hkpoutlook/C-TECHR-DPvtLtd.git
cd C-TECHR-DPvtLtd
sudo chown -R $USER:$USER .
```

### 2.2 Set Up Frontend

```bash
cd website/frontend
npm install --legacy-peer-deps

# Build for production
npm run build

# Start with PM2
pm2 start "npm start" --name "ctechr-frontend"
pm2 save
```

### 2.3 Set Up Backend

```bash
cd website/backend

# Install dependencies
npm install --legacy-peer-deps

# Create environment file
cp .env.example .env
```

**Edit .env with production values:**
```bash
nano .env
```

```env
PORT=5000
NODE_ENV=production

FRONTEND_URL=https://www.ctechrnd.com

DB_HOST=localhost
DB_PORT=3306
DB_USER=ctechr_user
DB_PASSWORD=secure_password
DB_NAME=ctechr_database

STRIPE_SECRET_KEY=sk_live_your_stripe_key
PAYPAL_CLIENT_ID=your_paypal_id
PAYPAL_SECRET=your_paypal_secret

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=app_password

JWT_SECRET=generate_strong_secret
APP_URL=https://www.ctechrnd.com
API_URL=https://api.ctechrnd.com
```

**Save and start:**
```bash
pm2 start npm --name "ctechr-backend" -- start
pm2 save
```

### 2.4 Set Up Database

```bash
# Create database
mysql -u root -p -e "CREATE DATABASE ctechr_database;"
mysql -u root -p -e "CREATE USER 'ctechr_user'@'localhost' IDENTIFIED BY 'secure_password';"
mysql -u root -p -e "GRANT ALL PRIVILEGES ON ctechr_database.* TO 'ctechr_user'@'localhost';"

# Import schema
mysql -u ctechr_user -p ctechr_database < database/payments_schema.sql
```

---

## 🌐 Step 3: Nginx Configuration

### 3.1 Create Frontend Configuration
```bash
sudo nano /etc/nginx/sites-available/ctechrnd.com
```

**Add:**
```nginx
server {
    listen 80;
    server_name www.ctechrnd.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3.2 Create API Configuration
```bash
sudo nano /etc/nginx/sites-available/api.ctechrnd.com
```

**Add:**
```nginx
server {
    listen 80;
    server_name api.ctechrnd.com;

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
    }
}
```

### 3.3 Enable Sites
```bash
sudo ln -s /etc/nginx/sites-available/ctechrnd.com /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/api.ctechrnd.com /etc/nginx/sites-enabled/

# Remove default
sudo rm /etc/nginx/sites-enabled/default

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔐 Step 4: SSL/HTTPS Setup

### 4.1 Configure DNS Records

**Point your domain registrar:**
```
A Record:
  www.ctechrnd.com → Your_Server_IP
  api.ctechrnd.com → Your_Server_IP
```

Wait 5-10 minutes for DNS propagation.

### 4.2 Get SSL Certificates
```bash
sudo certbot certonly --standalone -d www.ctechrnd.com -d api.ctechrnd.com
```

### 4.3 Update Nginx with SSL
```bash
sudo nano /etc/nginx/sites-available/ctechrnd.com
```

**Replace with:**
```nginx
server {
    listen 80;
    server_name www.ctechrnd.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.ctechrnd.com;

    ssl_certificate /etc/letsencrypt/live/www.ctechrnd.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.ctechrnd.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Do the same for API:**
```bash
sudo nano /etc/nginx/sites-available/api.ctechrnd.com
```

### 4.4 Enable Auto-Renewal
```bash
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### 4.5 Reload Nginx
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## ✅ Step 5: Verification

### 5.1 Check Services
```bash
# Check PM2 status
pm2 status

# Check Nginx
sudo systemctl status nginx

# Check MySQL
sudo systemctl status mysql
```

### 5.2 Test URLs
```bash
# Frontend
curl https://www.ctechrnd.com

# Backend Health
curl https://api.ctechrnd.com/health

# API Status
curl https://api.ctechrnd.com/api/status

# Content
curl https://api.ctechrnd.com/api/concept-books
curl https://api.ctechrnd.com/api/products
curl https://api.ctechrnd.com/api/research
```

### 5.3 Test Payments
```bash
# Create payment intent
curl -X POST https://api.ctechrnd.com/api/payments/create-intent \
  -H "Content-Type: application/json" \
  -d '{"amount": 5000, "currency": "USD"}'

# Get donation summary
curl https://api.ctechrnd.com/api/donations/summary
```

---

## 📊 Step 6: Monitoring & Maintenance

### 6.1 Set Up Logging
```bash
# View PM2 logs
pm2 logs ctechr-frontend
pm2 logs ctechr-backend

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# MySQL slow query log
sudo tail -f /var/log/mysql/slow.log
```

### 6.2 Backups
```bash
# Database backup (daily)
sudo crontab -e
```

**Add:**
```cron
0 2 * * * mysqldump -u ctechr_user -p'secure_password' ctechr_database | gzip > /backups/db-$(date +\%Y\%m\%d).sql.gz
```

### 6.3 Monitor Performance
```bash
# Check server resources
top
free -h
df -h

# Check Node processes
ps aux | grep node

# Check Nginx
sudo systemctl status nginx
```

---

## 🔒 Security Checklist

- [ ] SSH key authentication only (no password)
- [ ] Firewall configured (UFW or similar)
- [ ] Only necessary ports open (80, 443, 22)
- [ ] SSL/HTTPS enforced
- [ ] Environment variables secure
- [ ] Database password strong
- [ ] JWT secret strong and unique
- [ ] Regular backups configured
- [ ] Monitoring alerts set up
- [ ] Security headers configured

### Example UFW Setup
```bash
sudo ufw enable
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw status
```

---

## 🚨 Troubleshooting

### Port Already in Use
```bash
sudo lsof -i :3000
sudo lsof -i :5000
kill -9 PID
```

### Nginx Not Reloading
```bash
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

### Certificate Issues
```bash
sudo certbot renew --dry-run
sudo certbot renew  # Force renewal
```

### Database Connection Failed
```bash
mysql -u ctechr_user -p -h localhost ctechr_database
SHOW TABLES;
```

---

## 📈 Performance Optimization

### Enable Gzip Compression
```bash
sudo nano /etc/nginx/nginx.conf
# Add under http block:
gzip on;
gzip_types text/plain text/css text/javascript;
gzip_min_length 1000;
```

### Set Up Caching
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

---

## 🎉 Deployment Complete!

Your ctechrnd.com platform is now live with:
- ✅ React frontend on www.ctechrnd.com
- ✅ Express API on api.ctechrnd.com
- ✅ HTTPS/SSL enabled
- ✅ Payment system ready
- ✅ Donation system ready
- ✅ Database connected

**Monitor and maintain regularly!**

For support: See URL-STRUCTURE.md and DEPLOYMENT_CHECKLIST.md
