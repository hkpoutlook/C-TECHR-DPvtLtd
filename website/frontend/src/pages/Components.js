import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Components() {
  const [components, setComponents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', application: '', requirement: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api/components')
      .then(res => {
        setComponents(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/component-inquiry', formData)
      .then(res => {
        setMessage('✅ ' + res.data.message);
        setFormData({ name: '', email: '', application: '', requirement: '' });
      })
      .catch(err => setMessage('❌ Error submitting form'));
  };

  if (loading) return <div className="container"><div className="loading">Loading components...</div></div>;

  return (
    <div className="container">
      <section>
        <h2>⚙️ Components & Hardware Ecosystem</h2>
        <p style={{ textAlign: 'center', fontSize: '1.1rem', marginBottom: '2rem' }}>Basic → Professional → Research & Development</p>

        <h3>🆓 Basic Foundational Components</h3>
        <p>Learning & fundamental prototyping</p>
        <div className="cards-grid">
          <div className="card">
            <h4>Sensors</h4>
            {components?.foundation.sensors.map((item, idx) => <p key={idx}>✔ {item}</p>)}
          </div>
          <div className="card">
            <h4>Microcontrollers</h4>
            {components?.foundation.microcontrollers.map((item, idx) => <p key={idx}>✔ {item}</p>)}
          </div>
          <div className="card">
            <h4>Access Level</h4>
            <p><span style={{ color: 'green', fontWeight: 'bold', fontSize: '1.2rem' }}>FREE</span></p>
          </div>
        </div>

        <h3>💼 Professional-Grade Components</h3>
        <p>Industrial & application-ready</p>
        <div className="cards-grid">
          <div className="card">
            <h4>Sensors & Measurement</h4>
            {components?.professional.sensors.map((item, idx) => <p key={idx}>✔ {item}</p>)}
          </div>
          <div className="card">
            <h4>ADCs & Interfaces</h4>
            {components?.professional.adcs.map((item, idx) => <p key={idx}>✔ {item}</p>)}
          </div>
          <div className="card">
            <h4>Microcontrollers</h4>
            {components?.professional.microcontrollers.map((item, idx) => <p key={idx}>✔ {item}</p>)}
          </div>
        </div>

        <h3>🔬 Research & Development Components</h3>
        <p>Advanced & experimental systems</p>
        <div className="cards-grid">
          <div className="card">
            <h4>High-Precision</h4>
            {components?.research.highPrecision.map((item, idx) => <p key={idx}>✔ {item}</p>)}
          </div>
          <div className="card">
            <h4>Advanced Systems</h4>
            {components?.research.advancedSystems.map((item, idx) => <p key={idx}>✔ {item}</p>)}
          </div>
        </div>

        <h2 style={{ marginTop: '3rem' }}>Component Inquiry Form</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Your Name" 
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="text" 
            placeholder="Application Type" 
            required
            value={formData.application}
            onChange={(e) => setFormData({...formData, application: e.target.value})}
          />
          <textarea 
            placeholder="Your Requirement" 
            rows="4"
            required
            value={formData.requirement}
            onChange={(e) => setFormData({...formData, requirement: e.target.value})}
          ></textarea>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit Inquiry</button>
        </form>
        {message && <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}
      </section>
    </div>
  );
}

export default Components;
