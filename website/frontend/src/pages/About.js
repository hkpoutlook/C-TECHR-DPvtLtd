import React from 'react';

function About() {
  return (
    <div className="container">
      <section>
        <h2>About C-TECH Research & Development</h2>
        
        <h3>Our Identity</h3>
        <p>C-TECH Research & Development Pvt. Ltd. is a research-driven organization dedicated to building a strong knowledge ecosystem that connects educational institutions, industries, and research institutes.</p>

        <h3>Core Belief</h3>
        <blockquote style={{ borderLeft: '4px solid #005a99', paddingLeft: '1rem', margin: '1.5rem 0', fontStyle: 'italic', color: '#555' }}>
          <strong>"Without strong concepts, no technology survives."</strong>
        </blockquote>

        <h3>What We Do</h3>
        <ul style={{ marginLeft: '2rem', lineHeight: '2' }}>
          <li>✔ Develop research-based concept books and learning materials</li>
          <li>✔ Provide hands-on training and professional certifications</li>
          <li>✔ Supply industrial-grade components and hardware solutions</li>
          <li>✔ Design and build innovative products based on research</li>
          <li>✔ Collaborate with institutions and industries on R&D projects</li>
        </ul>

        <h3>Our Philosophy</h3>
        <div className="cards-grid">
          <div className="card">
            <h4>Concept > Code</h4>
            <p>Understanding fundamentals is more important than learning shortcuts.</p>
          </div>
          <div className="card">
            <h4>Science > Marketing</h4>
            <p>We focus on real engineering value, not flashy features.</p>
          </div>
          <div className="card">
            <h4>Research > Products</h4>
            <p>Products are built on solid research and experimentation.</p>
          </div>
          <div className="card">
            <h4>Education > Certification</h4>
            <p>Real knowledge is more valuable than paper certificates.</p>
          </div>
        </div>

        <h3>India's Need for Strong Research Ecosystem</h3>
        <p style={{ fontSize: '1.1rem', backgroundColor: '#f0f4f8', padding: '1.5rem', borderRadius: '5px', borderLeft: '4px solid #005a99' }}>
          <strong>India needs strong research-based knowledge, knowledge-driven industries, and capable research institutes that produce both impactful research papers and real-world products.</strong>
        </p>
        <p>C-TECH is committed to contributing to this mission by building engineers, researchers, and innovators who understand that strong technology is built on strong fundamentals.</p>
      </section>
    </div>
  );
}

export default About;
