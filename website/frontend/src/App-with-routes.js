/**
 * App.js - Main React Application with Complete URL Routing
 * ctechrnd.com
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import CategoryView from './components/CategoryView';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Certifications from './pages/Certifications';
import ConceptBooks from './pages/ConceptBooks';
import Products from './pages/Products';
import Components from './pages/Components'; // Research page

// Payment & Donation Pages (To be created)
// import PaymentPage from './pages/PaymentPage';
// import DonationPage from './pages/DonationPage';
// import PaymentSuccess from './pages/PaymentSuccess';
// import PaymentFailed from './pages/PaymentFailed';
// import DonationSuccess from './pages/DonationSuccess';
// import DonationLeaderboard from './pages/DonationLeaderboard';

// User Pages (To be created)
// import Login from './pages/Login';
// import SignUp from './pages/SignUp';
// import UserAccount from './pages/UserAccount';
// import SubscriptionManager from './pages/SubscriptionManager';
// import PaymentHistory from './pages/PaymentHistory';
// import DonationHistory from './pages/DonationHistory';

// Styles
import './App.css';

/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 */
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('authToken');
  return isAuthenticated ? children : <Navigate to="/login" />;
}

/**
 * Main App Component
 */
function App() {
  React.useEffect(() => {
    // Set API base URL
    axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    
    // Add auth token to requests if available
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <Header />
        
        <main className="main-content">
          <Routes>
            {/* ========================================
                PUBLIC ROUTES
                ======================================== */}
            
            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/certifications" element={<Certifications />} />
            
            {/* Content Library */}
            <Route path="/library" element={<CategoryView />} />
            <Route path="/concept-books" element={<ConceptBooks />} />
            <Route path="/products" element={<Products />} />
            <Route path="/research" element={<Components />} />
            
            {/* Payment & Donation Routes */}
            {/* Uncomment when components are created */}
            {/* <Route path="/payment" element={<PaymentPage />} />
            <Route path="/donate" element={<DonationPage />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
            <Route path="/donation-success" element={<DonationSuccess />} />
            <Route path="/donation-leaderboard" element={<DonationLeaderboard />} /> */}
            
            {/* ========================================
                AUTHENTICATION ROUTES
                ======================================== */}
            
            {/* Uncomment when components are created */}
            {/* <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} /> */}
            
            {/* ========================================
                PROTECTED ROUTES (Require Authentication)
                ======================================== */}
            
            {/* Uncomment when components are created */}
            {/* <Route 
              path="/account" 
              element={
                <ProtectedRoute>
                  <UserAccount />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/account/subscriptions" 
              element={
                <ProtectedRoute>
                  <SubscriptionManager />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/account/payments" 
              element={
                <ProtectedRoute>
                  <PaymentHistory />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/account/donations" 
              element={
                <ProtectedRoute>
                  <DonationHistory />
                </ProtectedRoute>
              } 
            /> */}
            
            {/* ========================================
                FALLBACK ROUTE
                ======================================== */}
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;

/**
 * ========================================
 * COMPLETE URL ROUTING MAP
 * ========================================
 * 
 * PUBLIC ROUTES:
 * ─────────────
 * /                        Home page
 * /about                   About company
 * /contact                 Contact form
 * /certifications          Company certifications
 * /library                 All content in one place
 * /concept-books           Concept books catalog
 * /products                Products catalog
 * /research                Research papers catalog
 * /payment                 Payment/purchase page
 * /donate                  Donation page
 * /payment-success         Payment confirmation
 * /payment-failed          Payment error
 * /donation-success        Donation confirmation
 * /donation-leaderboard    Top donors list
 * /login                   User login
 * /signup                  User registration
 * 
 * PROTECTED ROUTES (Authentication Required):
 * ───────────────────────────────────────────
 * /account                 User dashboard
 * /account/subscriptions   Manage subscriptions
 * /account/payments        Payment history
 * /account/donations       Donation history
 * 
 * ========================================
 */
