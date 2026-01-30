import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo Section */}
          <Link to="/" className="logo-section">
            <img src="/logo.svg" alt="C-TECH Logo" className="logo-image" />
            <div className="logo-text">
              <div className="logo-title">C-TECH</div>
              <div className="logo-subtitle">Research & Development</div>
            </div>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Navigation Menu */}
          <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
            <li><Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link></li>
            <li><Link to="/concept-books" onClick={() => setMobileMenuOpen(false)}>Books</Link></li>
            <li><Link to="/research" onClick={() => setMobileMenuOpen(false)}>Research</Link></li>
            <li><Link to="/products" onClick={() => setMobileMenuOpen(false)}>Products</Link></li>
            <li><Link to="/certifications" onClick={() => setMobileMenuOpen(false)}>Certifications</Link></li>
            <li><Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link></li>
            <li><Link to="/donate" className="donate-btn" onClick={() => setMobileMenuOpen(false)}>Donate</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
