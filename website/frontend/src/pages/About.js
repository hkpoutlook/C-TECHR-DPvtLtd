import React from 'react';

function About() {
  return (
    <div className="container">
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        
        {/* Vision Section */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#2c3e50', marginBottom: '1rem' }}>Our Vision</h2>
          <p style={{ fontSize: '1.3rem', color: '#4169E1', fontWeight: '600', marginBottom: '0.5rem' }}>
            "To build a global, research-driven ecosystem that transforms scientific knowledge into meaningful technology, products, and innovation."
          </p>
          <p style={{ fontSize: '1.1rem', color: '#555', fontStyle: 'italic' }}>
            Turning science into technology, knowledge into impact.
          </p>
        </div>

        {/* Core Purpose Section */}
        <div style={{ marginBottom: '3rem', backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '10px' }}>
          <h2 style={{ fontSize: '2rem', color: '#2c3e50', marginBottom: '1rem' }}>Core Purpose</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#333' }}>
            "To develop strong research-based knowledge across educational institutions, industries, and research organizations, enabling the creation of impactful products and scientific discoveries."
          </p>
          <p style={{ fontSize: '1.1rem', color: '#4169E1', fontWeight: '600', marginTop: '1rem' }}>
            Empower learners and researchers to convert ideas into science and technology.
          </p>
        </div>

        {/* Core Values Section */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', color: '#2c3e50', marginBottom: '2rem', textAlign: 'center' }}>Core Values</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            
            <div style={{ padding: '1.5rem', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderLeft: '4px solid #4169E1' }}>
              <h3 style={{ color: '#4169E1', marginBottom: '0.5rem' }}>Innovation</h3>
              <p style={{ color: '#555' }}>Encourage creativity and original problem-solving.</p>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderLeft: '4px solid #28a745' }}>
              <h3 style={{ color: '#28a745', marginBottom: '0.5rem' }}>Integrity</h3>
              <p style={{ color: '#555' }}>Uphold honesty, transparency, and trust in all research.</p>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderLeft: '4px solid #ffc107' }}>
              <h3 style={{ color: '#ffc107', marginBottom: '0.5rem' }}>Excellence</h3>
              <p style={{ color: '#555' }}>Deliver high-quality education, research, and solutions.</p>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderLeft: '4px solid #17a2b8' }}>
              <h3 style={{ color: '#17a2b8', marginBottom: '0.5rem' }}>Collaboration</h3>
              <p style={{ color: '#555' }}>Connect academia, industry, and research institutes globally.</p>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderLeft: '4px solid #6f42c1' }}>
              <h3 style={{ color: '#6f42c1', marginBottom: '0.5rem' }}>Accessibility</h3>
              <p style={{ color: '#555' }}>Make foundational knowledge free and open to all learners.</p>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderLeft: '4px solid #dc3545' }}>
              <h3 style={{ color: '#dc3545', marginBottom: '0.5rem' }}>Impact</h3>
              <p style={{ color: '#555' }}>Focus on research and products that benefit society.</p>
            </div>

          </div>
        </div>

        {/* Goal Section */}
        <div style={{ marginBottom: '3rem', backgroundColor: '#4169E1', color: 'white', padding: '2rem', borderRadius: '10px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Our Goal</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
            "To create a strong, globally recognized platform for research, knowledge, and technical development that produces certified experts, innovative products, and high-impact scientific publications."
          </p>
          <p style={{ fontSize: '1.1rem', fontWeight: '600', marginTop: '1rem' }}>
            Develop researchers, create products, and advance science worldwide.
          </p>
        </div>

        {/* Mission Section */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', color: '#2c3e50', marginBottom: '1.5rem', textAlign: 'center' }}>Our Mission</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#333', marginBottom: '2rem', textAlign: 'center' }}>
            "C-TECH R&D delivers a complete digital ecosystem for learning, research, and innovation: providing structured concept books, hands-on training, certifications, research collaboration, and access to components and tools — empowering individuals and institutions to produce knowledge, products, and technology with global impact."
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
              <h3 style={{ color: '#4169E1', marginBottom: '0.5rem' }}>Educate</h3>
              <p style={{ color: '#555' }}>Provide free foundational knowledge and paid advanced learning.</p>
            </div>

            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💪</div>
              <h3 style={{ color: '#28a745', marginBottom: '0.5rem' }}>Empower</h3>
              <p style={{ color: '#555' }}>Hands-on skills, projects, and certifications to build capability.</p>
            </div>

            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
              <h3 style={{ color: '#ffc107', marginBottom: '0.5rem' }}>Innovate</h3>
              <p style={{ color: '#555' }}>Support research, development, and production of impactful science and technology.</p>
            </div>

          </div>
        </div>

        {/* Summary Table */}
        <div style={{ marginTop: '3rem', overflowX: 'auto' }}>
          <h2 style={{ fontSize: '2rem', color: '#2c3e50', marginBottom: '1.5rem', textAlign: 'center' }}>Quick Reference</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <thead>
              <tr style={{ backgroundColor: '#4169E1', color: 'white' }}>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Strategic Element</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Statement</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '1rem', fontWeight: '600', color: '#4169E1' }}>Vision</td>
                <td style={{ padding: '1rem' }}>Transform scientific knowledge into impactful technology.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #ddd', backgroundColor: '#f8f9fa' }}>
                <td style={{ padding: '1rem', fontWeight: '600', color: '#4169E1' }}>Core Purpose</td>
                <td style={{ padding: '1rem' }}>Empower learners and researchers to convert ideas into technology.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '1rem', fontWeight: '600', color: '#4169E1' }}>Core Values</td>
                <td style={{ padding: '1rem' }}>Innovation, Integrity, Excellence, Collaboration, Accessibility, Impact</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #ddd', backgroundColor: '#f8f9fa' }}>
                <td style={{ padding: '1rem', fontWeight: '600', color: '#4169E1' }}>Goal</td>
                <td style={{ padding: '1rem' }}>Build a globally recognized research and innovation platform.</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', fontWeight: '600', color: '#4169E1' }}>Mission</td>
                <td style={{ padding: '1rem' }}>Deliver knowledge, training, certification, and R&D tools digitally to enable global impact.</td>
              </tr>
            </tbody>
          </table>
        </div>

      </section>
    </div>
  );
}

export default About;
