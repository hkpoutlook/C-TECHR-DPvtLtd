import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-container">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/logo.svg" alt="C-TECH Logo" className="footer-logo-img" />
              <h3>C-TECH R&D</h3>
            </div>
            <p className="footer-description">
              Building research-based knowledge ecosystem connecting education, industry, and research.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Twitter">𝕏</a>
              <a href="#" aria-label="LinkedIn">in</a>
              <a href="#" aria-label="Instagram">📷</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/research">Research</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/concept-books">Concept Books</Link></li>
              <li><Link to="/library">Library</Link></li>
              <li><Link to="/certifications">Certifications</Link></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>
              <strong>Email:</strong><br />
              <a href="mailto:info@ctechrnd.com">info@ctechrnd.com</a>
            </p>
            <p>
              <strong>Phone:</strong><br />
              <a href="tel:+919876543210">+91-98765-43210</a>
            </p>
            <p>
              <strong>Address:</strong><br />
              Research Park, Tech City<br />
              India
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} C-TECH Research & Development Pvt. Ltd. All rights reserved.</p>
          <p>Designed with <span className="heart">❤️</span> for innovation and research</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
