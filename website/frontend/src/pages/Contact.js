import React, { useState } from 'react';
import axios from 'axios';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', type: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/contact', formData)
      .then(res => {
        setMessage('✅ ' + res.data.message);
        setFormData({ name: '', email: '', message: '', type: '' });
      })
      .catch(err => setMessage('❌ Error submitting form'));
  };

  return (
    <div className="container">
      <section>
        <h2>Contact C-TECH R&D</h2>

        <h3>Get in Touch</h3>
        <div className="cards-grid">
          <div className="card">
            <h4>📧 Email</h4>
            <p>info@ctech-rd.com</p>
          </div>
          <div className="card">
            <h4>📞 Phone</h4>
            <p>+91-XXXX-XXXX-XXXX</p>
          </div>
          <div className="card">
            <h4>🌐 Website</h4>
            <p>www.ctech-rd.com</p>
          </div>
        </div>

        <h3 style={{ marginTop: '2rem' }}>Send us a Message</h3>
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
          <select 
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            required
          >
            <option value="">Select Inquiry Type</option>
            <option value="training">Training Inquiry</option>
            <option value="component">Component Inquiry</option>
            <option value="product">Product Requirement</option>
            <option value="research">R&D Proposal</option>
            <option value="collaboration">Collaboration</option>
            <option value="other">Other</option>
          </select>
          <textarea 
            placeholder="Your Message" 
            rows="6"
            required
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
        </form>
        {message && <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}

        <h3 style={{ marginTop: '2rem' }}>Why Partner with C-TECH?</h3>
        <div className="cards-grid">
          <div className="card">
            <h4>🎯 Research-Driven</h4>
            <p>All solutions grounded in scientific principles and real engineering.</p>
          </div>
          <div className="card">
            <h4>🏆 Industry Experience</h4>
            <p>Team with proven track record in electronics, instrumentation, and embedded systems.</p>
          </div>
          <div className="card">
            <h4>📚 Knowledge Sharing</h4>
            <p>We believe in strengthening the entire ecosystem through education and collaboration.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
