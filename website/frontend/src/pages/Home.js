import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <img src="/logo.svg" alt="C-TECH Logo" className="hero-logo" />
          <h1>C-TECH Research & Development</h1>
          <p className="hero-subtitle">Building a research-driven ecosystem connecting education, industry, and research to create impactful science and technology.</p>
          <div className="cta-buttons">
            <Link to="/concept-books" className="btn btn-primary">Explore Knowledge</Link>
            <Link to="/contact" className="btn btn-secondary">Get Started</Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container">
        {/* Vision & Mission */}
        <section className="section">
          <h2>Our Vision & Mission</h2>
          <div className="cards-grid">
            <div className="card">
              <div className="card-icon">🌍</div>
              <h4>Vision</h4>
              <p>Building a research-based knowledge ecosystem connecting educational institutions, industries, and research institutes, leading to meaningful products and scientific research.</p>
            </div>
            <div className="card">
              <div className="card-icon">🎯</div>
              <h4>Mission</h4>
              <p>Strengthen basic science through technical development. Transform conceptual understanding into practical technology. Bridge the gap between education and industry.</p>
            </div>
            <div className="card">
              <div className="card-icon">🧠</div>
              <h4>Core Philosophy</h4>
              <p>Strong technology cannot exist without strong science. Concept > Code. Understanding > Certificates. Experimentation > Theory alone.</p>
            </div>
          </div>
        </section>

        {/* Three Pillars */}
        <section className="section">
          <h2>Three Pillars of C-TECH</h2>
          <div className="cards-grid">
            <div className="card pillar-card">
              <div className="card-icon">📚</div>
              <h4>Knowledge Ecosystem</h4>
              <p><strong>Concept Books</strong> • Training Programs • Certifications</p>
              <p>Research-driven learning for students, engineers, and researchers.</p>
              <Link to="/concept-books" className="btn btn-primary btn-small">Explore Books</Link>
            </div>
            <div className="card pillar-card">
              <div className="card-icon">⚙️</div>
              <h4>Components & Hardware</h4>
              <p><strong>Foundational • Professional • Research-Grade</strong></p>
              <p>Industrial-grade components selected for reliability and performance.</p>
              <Link to="/research" className="btn btn-primary btn-small">View Components</Link>
            </div>
            <div className="card pillar-card">
              <div className="card-icon">🚀</div>
              <h4>Products & Innovation</h4>
              <p><strong>Educational • Industrial • Research-Grade</strong></p>
              <p>From learning systems to next-generation technology solutions.</p>
              <Link to="/products" className="btn btn-primary btn-small">Explore Products</Link>
            </div>
          </div>
        </section>

        {/* Business Model */}
        <section className="section">
          <h2>Start Free • Go Deep When Ready</h2>
          <p className="section-subtitle">Our Access Model</p>
          <div className="cards-grid">
            <div className="card access-card">
              <div className="card-icon">🆓</div>
              <h4>Free Foundation</h4>
              <ul className="feature-list">
                <li>✔ Concept overviews</li>
                <li>✔ Sample chapters</li>
                <li>✔ Basic component lists</li>
                <li>✔ Product introductions</li>
              </ul>
            </div>
            <div className="card access-card">
              <div className="card-icon">💳</div>
              <h4>Paid Professional</h4>
              <ul className="feature-list">
                <li>✔ Full books & content</li>
                <li>✔ Detailed specifications</li>
                <li>✔ Training & certification</li>
                <li>✔ Engineer consultation</li>
              </ul>
            </div>
            <div className="card access-card">
              <div className="card-icon">🔬</div>
              <h4>R&D Partnerships</h4>
              <ul className="feature-list">
                <li>✔ Research collaboration</li>
                <li>✔ Custom development</li>
                <li>✔ Joint innovation</li>
                <li>✔ Product development</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <h2>Ready to Start Your Journey?</h2>
          <p>Explore concept books, learn new skills, and connect with our research community.</p>
          <div className="cta-buttons">
            <Link to="/concept-books" className="btn btn-primary">Explore Free Content</Link>
            <Link to="/certifications" className="btn btn-secondary">View Certifications</Link>
            <Link to="/contact" className="btn btn-secondary">Get in Touch</Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
