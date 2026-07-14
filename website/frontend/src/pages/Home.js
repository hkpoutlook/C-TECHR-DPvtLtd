import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #4169E1 0%, #2c3e50 100%)', 
        color: 'white', 
        padding: '80px 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Complete Solution for Practical & Graphical Teaching</h1>
        <p style={{ fontSize: '1.4rem', marginBottom: '2rem', opacity: '0.95' }}>
          Learn science and technology through hands-on experiments, interactive visualizations, and real-world applications
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/concept-books" style={{ 
            padding: '12px 30px', 
            backgroundColor: 'white', 
            color: '#4169E1', 
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            fontSize: '1.1rem'
          }}>Start Learning Free</Link>
          <Link to="/contact" style={{ 
            padding: '12px 30px', 
            backgroundColor: 'transparent',
            color: 'white',
            border: '2px solid white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            fontSize: '1.1rem'
          }}>Get in Touch</Link>
        </div>
      </section>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        
        {/* Practical & Graphical Teaching */}
        <section style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#2c3e50', marginBottom: '2rem' }}>Our Teaching Approach</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            
            <div style={{ 
              padding: '2rem', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              borderTop: '4px solid #4169E1'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
              <h3 style={{ color: '#4169E1', marginBottom: '0.5rem' }}>Graphical Learning</h3>
              <p style={{ color: '#555' }}>Interactive diagrams, simulations, and visual representations help you understand complex concepts instantly.</p>
            </div>

            <div style={{ 
              padding: '2rem', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              borderTop: '4px solid #28a745'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔬</div>
              <h3 style={{ color: '#28a745', marginBottom: '0.5rem' }}>Practical Experiments</h3>
              <p style={{ color: '#555' }}>Build real circuits, conduct measurements, and perform hands-on experiments with actual components.</p>
            </div>

            <div style={{ 
              padding: '2rem', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              borderTop: '4px solid #ffc107'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
              <h3 style={{ color: '#ffc107', marginBottom: '0.5rem' }}>Theory to Application</h3>
              <p style={{ color: '#555' }}>Connect theoretical knowledge to real-world applications and industry-standard solutions.</p>
            </div>

          </div>
        </section>

        {/* Four Levels of Learning */}
        <section style={{ marginBottom: '3rem', backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '10px' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#2c3e50', marginBottom: '2rem', textAlign: 'center' }}>Progressive Learning Levels</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            
            <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', borderLeft: '4px solid #4CAF50' }}>
              <h3 style={{ color: '#4CAF50' }}>📖 Level 1: Concepts</h3>
              <p>Understand the fundamental theories and scientific principles</p>
              <p style={{ fontSize: '0.9rem', color: '#999' }}>Free access to basics</p>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', borderLeft: '4px solid #2196F3' }}>
              <h3 style={{ color: '#2196F3' }}>⚙️ Level 2: Components</h3>
              <p>Learn about sensors, instruments, and industrial components</p>
              <p style={{ fontSize: '0.9rem', color: '#999' }}>Hands-on component selection</p>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', borderLeft: '4px solid #FF9800' }}>
              <h3 style={{ color: '#FF9800' }}>🔧 Level 3: Practical Skills</h3>
              <p>Build circuits, perform measurements, and conduct experiments</p>
              <p style={{ fontSize: '0.9rem', color: '#999' }}>Certification programs available</p>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', borderLeft: '4px solid #9C27B0' }}>
              <h3 style={{ color: '#9C27B0' }}>🚀 Level 4: Innovation</h3>
              <p>Develop original products and contribute to research</p>
              <p style={{ fontSize: '0.9rem', color: '#999' }}>R&D collaboration opportunities</p>
            </div>

          </div>
        </section>

        {/* Three Core Offerings */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#2c3e50', marginBottom: '2rem', textAlign: 'center' }}>Our Complete Offerings</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            <div style={{ 
              padding: '2rem', 
              backgroundColor: 'white', 
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease'
            }}>
              <h3 style={{ color: '#4169E1', marginBottom: '1rem', fontSize: '1.5rem' }}>📚 Knowledge Ecosystem</h3>
              <ul style={{ lineHeight: '1.8', color: '#555' }}>
                <li>✓ Research-based concept books</li>
                <li>✓ Interactive learning modules</li>
                <li>✓ Video tutorials & demonstrations</li>
                <li>✓ Professional certifications</li>
              </ul>
              <Link to="/concept-books" style={{ 
                display: 'inline-block',
                marginTop: '1.5rem',
                padding: '10px 20px',
                backgroundColor: '#4169E1',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                fontWeight: 'bold'
              }}>Explore</Link>
            </div>

            <div style={{ 
              padding: '2rem', 
              backgroundColor: 'white', 
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#28a745', marginBottom: '1rem', fontSize: '1.5rem' }}>🔧 Practical Components</h3>
              <ul style={{ lineHeight: '1.8', color: '#555' }}>
                <li>✓ Sensors & measurement tools</li>
                <li>✓ Educational kits</li>
                <li>✓ Industrial-grade equipment</li>
                <li>✓ Hands-on experiment bundles</li>
              </ul>
              <Link to="/products" style={{ 
                display: 'inline-block',
                marginTop: '1.5rem',
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                fontWeight: 'bold'
              }}>Explore</Link>
            </div>

            <div style={{ 
              padding: '2rem', 
              backgroundColor: 'white', 
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#FF9800', marginBottom: '1rem', fontSize: '1.5rem' }}>🚀 Research & Innovation</h3>
              <ul style={{ lineHeight: '1.8', color: '#555' }}>
                <li>✓ Collaborative research projects</li>
                <li>✓ Custom development services</li>
                <li>✓ Research publications</li>
                <li>✓ Innovation partnerships</li>
              </ul>
              <Link to="/research" style={{ 
                display: 'inline-block',
                marginTop: '1.5rem',
                padding: '10px 20px',
                backgroundColor: '#FF9800',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                fontWeight: 'bold'
              }}>Explore</Link>
            </div>

          </div>
        </section>

        {/* Why Choose Us */}
        <section style={{ marginBottom: '3rem', backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '10px' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#2c3e50', marginBottom: '2rem', textAlign: 'center' }}>Why Choose C-TECH for Learning Science & Technology?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎯</div>
              <h4 style={{ color: '#4169E1' }}>Practical Focus</h4>
              <p style={{ color: '#555', fontSize: '0.95rem' }}>Learn by doing, not just reading</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📊</div>
              <h4 style={{ color: '#4169E1' }}>Visual Learning</h4>
              <p style={{ color: '#555', fontSize: '0.95rem' }}>Complex concepts made simple with graphics</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔬</div>
              <h4 style={{ color: '#4169E1' }}>Research-Based</h4>
              <p style={{ color: '#555', fontSize: '0.95rem' }}>Content validated by experts</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💼</div>
              <h4 style={{ color: '#4169E1' }}>Industry-Aligned</h4>
              <p style={{ color: '#555', fontSize: '0.95rem' }}>Real-world applications included</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🆓</div>
              <h4 style={{ color: '#4169E1' }}>Free Basics</h4>
              <p style={{ color: '#555', fontSize: '0.95rem' }}>Start learning without cost</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌍</div>
              <h4 style={{ color: '#4169E1' }}>Global Community</h4>
              <p style={{ color: '#555', fontSize: '0.95rem' }}>Connect with researchers worldwide</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section style={{ 
          textAlign: 'center', 
          background: 'linear-gradient(135deg, #4169E1 0%, #2c3e50 100%)', 
          color: 'white', 
          padding: '60px 2rem',
          borderRadius: '10px'
        }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Ready to Learn Science Through Practice?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Begin your journey from concepts to innovation</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/concept-books" style={{ 
              padding: '12px 30px', 
              backgroundColor: 'white', 
              color: '#4169E1', 
              textDecoration: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}>Explore Free Learning</Link>
            <Link to="/products" style={{ 
              padding: '12px 30px', 
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid white',
              textDecoration: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}>View Components & Kits</Link>
          </div>
        </section>

      </div>
    </>
  );
}

export default Home;
