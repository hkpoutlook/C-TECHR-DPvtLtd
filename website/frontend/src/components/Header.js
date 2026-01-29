import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <div className="logo">C-TECH R&D</div>
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
