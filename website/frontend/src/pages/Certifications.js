import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Certifications() {
  const [certifications, setCertifications] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/certifications')
      .then(res => {
        setCertifications(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return <div className="container"><div className="loading">Loading certifications...</div></div>;

  return (
    <div className="container">
      <section>
        <h2>🎓 C-TECH Certification Framework</h2>
        <p style={{ textAlign: 'center', fontSize: '1.1rem', marginBottom: '2rem' }}>Three Major Categories | Skill-Based Evaluation</p>

        <h3>Foundation → Professional → Advanced R&D</h3>
        <div className="cards-grid">
          <div className="card" style={{ background: '#f0f8ff', borderLeft: '4px solid #28a745' }}>
            <h4>🎯 {certifications?.foundation.name}</h4>
            <p><strong>Description:</strong> {certifications?.foundation.description}</p>
            <p><strong>Duration:</strong> {certifications?.foundation.duration}</p>
            <p><strong>Cost:</strong> {certifications?.foundation.price}</p>
            <h5 style={{ marginTop: '1rem' }}>Modules:</h5>
            <ul style={{ marginLeft: '1rem' }}>
              {certifications?.foundation.modules.map((module, idx) => (
                <li key={idx}>{module}</li>
              ))}
            </ul>
            <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Enroll Free</button>
          </div>

          <div className="card" style={{ background: '#fff8f0', borderLeft: '4px solid #ff9800' }}>
            <h4>💼 {certifications?.professional.name}</h4>
            <p><strong>Description:</strong> {certifications?.professional.description}</p>
            <p><strong>Duration:</strong> {certifications?.professional.duration}</p>
            <p><strong>Cost:</strong> {certifications?.professional.price}</p>
            <h5 style={{ marginTop: '1rem' }}>Modules:</h5>
            <ul style={{ marginLeft: '1rem' }}>
              {certifications?.professional.modules.map((module, idx) => (
                <li key={idx}>{module}</li>
              ))}
            </ul>
            <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Enroll Now</button>
          </div>

          <div className="card" style={{ background: '#f0f0ff', borderLeft: '4px solid #d32f2f' }}>
            <h4>🔬 {certifications?.research.name}</h4>
            <p><strong>Description:</strong> {certifications?.research.description}</p>
            <p><strong>Duration:</strong> {certifications?.research.duration}</p>
            <p><strong>Cost:</strong> {certifications?.research.price}</p>
            <h5 style={{ marginTop: '1rem' }}>Modules:</h5>
            <ul style={{ marginLeft: '1rem' }}>
              {certifications?.research.modules.map((module, idx) => (
                <li key={idx}>{module}</li>
              ))}
            </ul>
            <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Apply for R&D</button>
          </div>
        </div>

        <h3 style={{ marginTop: '2rem' }}>Certification Philosophy</h3>
        <p style={{ fontSize: '1.1rem', backgroundColor: '#f9fbfd', padding: '1.5rem', borderRadius: '5px', borderLeft: '4px solid #005a99' }}>
          <strong>Concept creates understanding. Practice builds confidence. Research creates innovation.</strong>
        </p>
        <p>C-TECH certifications reflect real engineering capability, not just attendance. No MCQ-only exams. No fake skill certificates. Skill > Paper.</p>
      </section>
    </div>
  );
}

export default Certifications;
