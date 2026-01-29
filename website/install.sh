#!/bin/bash
# Installation script for C-TECH Website

echo "🔵 Installing C-TECH R&D Website..."
echo ""

echo "📦 Installing Backend Dependencies..."
cd /workspaces/C-TECHR-DPvtLtd/website/backend
npm install

echo ""
echo "📦 Installing Frontend Dependencies..."
cd /workspaces/C-TECHR-DPvtLtd/website/frontend
npm install

echo ""
echo "✅ Installation complete!"
echo ""
echo "🚀 To start the website:"
echo "   Terminal 1 - Backend: cd /workspaces/C-TECHR-DPvtLtd/website/backend && npm start"
echo "   Terminal 2 - Frontend: cd /workspaces/C-TECHR-DPvtLtd/website/frontend && npm start"
