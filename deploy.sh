#!/bin/bash

# =====================================================
# C-TECHR Platform - Quick Deployment Setup
# =====================================================

echo "╔═══════════════════════════════════════════════╗"
echo "║  C-TECHR URL Deployment Setup Script         ║"
echo "║  ctechrnd.com - Complete Platform            ║"
echo "╚═══════════════════════════════════════════════╝"
echo ""

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js is installed: $(node -v)"
else
    echo "❌ Node.js is not installed. Please install it first."
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    echo "✅ npm is installed: $(npm -v)"
else
    echo "❌ npm is not installed. Please install it first."
    exit 1
fi

# Check MySQL
if command -v mysql &> /dev/null; then
    echo "✅ MySQL is installed"
else
    echo "⚠️  MySQL is not installed. You may need it for database setup."
fi

echo ""
echo "🔧 Setting up project structure..."
echo ""

# Create frontend environment file
echo "📝 Creating frontend environment file..."
if [ ! -f website/frontend/.env.local ]; then
    cp website/frontend/.env.example website/frontend/.env.local
    echo "✅ Created website/frontend/.env.local"
else
    echo "⚠️  website/frontend/.env.local already exists"
fi

# Create backend environment file
echo "📝 Creating backend environment file..."
if [ ! -f website/backend/.env ]; then
    cp website/backend/.env.example website/backend/.env
    echo "✅ Created website/backend/.env"
else
    echo "⚠️  website/backend/.env already exists"
fi

echo ""
echo "📦 Installing dependencies..."
echo ""

# Install frontend dependencies
echo "🎨 Installing frontend dependencies..."
cd website/frontend
npm install --legacy-peer-deps
if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
cd ../..

echo ""

# Install backend dependencies
echo "⚙️  Installing backend dependencies..."
cd website/backend
npm install --legacy-peer-deps
if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
cd ../..

echo ""
echo "╔═══════════════════════════════════════════════╗"
echo "║  Setup Complete!                             ║"
echo "╚═══════════════════════════════════════════════╝"
echo ""
echo "📝 Next Steps:"
echo ""
echo "1️⃣  Update Configuration Files:"
echo "   • Edit website/frontend/.env.local"
echo "   • Edit website/backend/.env"
echo "   • Add your API URLs, payment keys, database credentials"
echo ""
echo "2️⃣  Set Up Database (Optional):"
echo "   • mysql -u root -p ctechr_database < database/payments_schema.sql"
echo ""
echo "3️⃣  Start Development Servers:"
echo ""
echo "   Terminal 1 - Frontend:"
echo "   $ cd website/frontend && npm start"
echo "   (Frontend will run on http://localhost:3000)"
echo ""
echo "   Terminal 2 - Backend:"
echo "   $ cd website/backend && npm start"
echo "   (Backend will run on http://localhost:5000)"
echo ""
echo "4️⃣  Test the URLs:"
echo "   • Frontend: http://localhost:3000"
echo "   • Backend: http://localhost:5000/api/status"
echo "   • Health: http://localhost:5000/health"
echo ""
echo "📚 Documentation:"
echo "   • See DEPLOYMENT_CHECKLIST.md for complete steps"
echo "   • See URL-STRUCTURE.md for all available routes"
echo "   • See URL-IMPLEMENTATION-GUIDE.md for detailed setup"
echo ""
echo "✨ Ready to develop and deploy!"
echo ""
