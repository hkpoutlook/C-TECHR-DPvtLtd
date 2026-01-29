import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <h1>C-TECH Research & Development Pvt. Ltd.</h1>
        <p>Building a research-driven ecosystem connecting education, industry, and research to create impactful science and technology.</p>
        <div className="cta-buttons">
          <Link to="/concept-books" className="btn btn-primary">Explore Knowledge</Link>
          <Link to="/contact" className="btn btn-secondary">Get Started</Link>
        </div>
      </section>

      {/* Main Content */}
      <div className="container">
        {/* Vision & Mission */}
        <section>
          <h2>Our Vision & Mission</h2>
          <div className="cards-grid">
            <div className="card">
              <h4>🌍 Vision</h4>
              <p>Building a research-based knowledge ecosystem connecting educational institutions, industries, and research institutes, leading to meaningful products and scientific research.</p>
            </div>
            <div className="card">
              <h4>🎯 Mission</h4>
              <p>Strengthen basic science through technical development. Transform conceptual understanding into practical technology. Bridge the gap between education and industry.</p>
            </div>
            <div className="card">
              <h4>🧠 Core Philosophy</h4>
              <p>Strong technology cannot exist without strong science. Concept > Code. Understanding > Certificates. Experimentation > Theory alone.</p>
            </div>
          </div>
        </section>

        {/* Three Pillars */}
        <section>
          <h2>Three Pillars of C-TECH</h2>
          <div className="cards-grid">
            <div className="card">
              <h4>📚 Knowledge Ecosystem</h4>
              <p><strong>Concept Books</strong> • Training Programs • Certifications</p>
              <p>Research-driven learning for students, engineers, and researchers.</p>
              <p><Link to="/concept-books" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block', padding: '8px 16px', fontSize: '0.9rem' }}>Explore Books</Link></p>
            </div>
            <div className="card">
              <h4>⚙️ Components & Hardware</h4>
              <p><strong>Foundational • Professional • Research-Grade</strong></p>
              <p>Industrial-grade components selected for reliability and performance.</p>
              <p><Link to="/components" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block', padding: '8px 16px', fontSize: '0.9rem' }}>View Components</Link></p>
            </div>
            <div className="card">
              <h4>🚀 Products & Innovation</h4>
              <p><strong>Educational • Industrial • Research-Grade</strong></p>
              <p>From learning systems to next-generation technology solutions.</p>
              <p><Link to="/products" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block', padding: '8px 16px', fontSize: '0.9rem' }}>Explore Products</Link></p>
            </div>
          </div>
        </section>

        {/* Business Model */}
        <section>
          <h2>Start Free • Go Deep When Ready</h2>
          <h3>Our Access Model</h3>
          <div className="cards-grid">
            <div className="card">
              <h4>🆓 Free Foundation</h4>
              <p>✔ Concept overviews</p>
              <p>✔ Sample chapters</p>
              <p>✔ Basic component lists</p>
              <p>✔ Product introductions</p>
            </div>
            <div className="card">
              <h4>💳 Paid Professional</h4>
              <p>✔ Full books & content</p>
              <p>✔ Detailed specifications</p>
              <p>✔ Training & certification</p>
              <p>✔ Engineer consultation</p>
            </div>
            <div className="card">
              <h4>🔬 R&D Partnerships</h4>
              <p>✔ Research collaboration</p>
              <p>✔ Custom development</p>
              <p>✔ Joint innovation</p>
              <p>✔ Product development</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section style={{ textAlign: 'center', background: 'linear-gradient(135deg, #003d82 0%, #005a99 100%)', color: 'white', padding: '60px 2rem' }}>
          <h2 style={{ color: 'white' }}>Ready to Start Your Journey?</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>Explore concept books, learn new skills, and connect with our research community.</p>
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
