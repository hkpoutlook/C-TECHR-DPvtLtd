#!/bin/bash

# C-TECH R&D Website - Quick Start Script
# Deploy www.ctechrnd.com with three content categories

echo "🚀 C-TECH R&D Website - Quick Start Setup"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Install Dependencies
echo -e "${BLUE}[1/5] Installing Frontend Dependencies...${NC}"
cd website/frontend
npm install
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"

echo -e "${BLUE}[2/5] Installing Backend Dependencies...${NC}"
cd ../backend
npm install
echo -e "${GREEN}✓ Backend dependencies installed${NC}"

# 2. Create Environment Files
echo -e "${BLUE}[3/5] Creating Environment Files...${NC}"

# Frontend env
cd ../frontend
cat > .env.development << EOF
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SITE_URL=http://localhost:3000
REACT_APP_ENV=development
EOF

cat > .env.production << EOF
REACT_APP_API_URL=https://api.ctechrnd.com
REACT_APP_SITE_URL=https://www.ctechrnd.com
REACT_APP_ENV=production
EOF

echo -e "${GREEN}✓ Frontend environment files created${NC}"

# Backend env
cd ../backend
cat > .env << EOF
PORT=5000
NODE_ENV=development
API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000
EOF

echo -e "${GREEN}✓ Backend environment file created${NC}"

# 3. Build Frontend
echo -e "${BLUE}[4/5] Building Frontend for Production...${NC}"
cd ../frontend
npm run build
echo -e "${GREEN}✓ Frontend built successfully${NC}"

# 4. Display Startup Instructions
echo ""
echo -e "${YELLOW}=========================================${NC}"
echo -e "${YELLOW}     SETUP COMPLETE - NEXT STEPS${NC}"
echo -e "${YELLOW}=========================================${NC}"
echo ""

echo -e "${BLUE}To start the development environment:${NC}"
echo ""
echo "Terminal 1 - Frontend:"
echo "  cd website/frontend"
echo "  npm start"
echo ""
echo "Terminal 2 - Backend:"
echo "  cd website/backend"
echo "  npm start"
echo ""

echo -e "${BLUE}Access the website at:${NC}"
echo "  Frontend: http://localhost:3000"
echo "  API: http://localhost:5000"
echo "  Content Library: http://localhost:3000/library"
echo ""

echo -e "${BLUE}For production deployment:${NC}"
echo "  See DEPLOYMENT.md for detailed instructions"
echo ""

echo -e "${GREEN}✓ All set! Your C-TECH website is ready to run.${NC}"
echo ""
