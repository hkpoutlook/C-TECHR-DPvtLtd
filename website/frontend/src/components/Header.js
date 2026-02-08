import React from 'react';
import { Link } from 'react-router-dom';
import { logoBase64 } from '../assets/logo';

function Header() {
  return (
    <header>
      <nav>
        <Link to="/" className="logo-container">
          <img 
            src={logoBase64}
            alt="C-TECH Logo" 
            className="logo-image"
            width="50" 
            height="50"
          />
          <div className="logo">C-TECH Research & Development Pvt. Ltd.</div>
        </Link>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/concept-books">Books</Link></li>
          <li><Link to="/components">Components</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/certifications">Certifications</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
