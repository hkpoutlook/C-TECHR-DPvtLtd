import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ConceptBooks() {
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', level: '', interest: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api/concept-books')
      .then(res => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/book-inquiry', formData)
      .then(res => {
        setMessage('✅ ' + res.data.message);
        setFormData({ name: '', email: '', level: '', interest: '' });
      })
      .catch(err => setMessage('❌ Error submitting form'));
  };

  if (loading) return <div className="container"><div className="loading">Loading concept books...</div></div>;

  return (
    <div className="container">
      <section>
        <h2>📚 Concept Books & Knowledge Series</h2>
        <p style={{ textAlign: 'center', fontSize: '1.1rem', marginBottom: '2rem' }}>Foundation → Professional → Research & Development</p>

        <h3>🎯 Foundation Concept Books</h3>
        <p>Build strong fundamentals for students and beginners.</p>
        <div className="cards-grid">
          {books?.foundation.map(book => (
            <div key={book.id} className="card">
              <h4>{book.title}</h4>
              <p><strong>Level:</strong> {book.level}</p>
              <p><strong>Access:</strong> <span style={{ color: 'green', fontWeight: 'bold' }}>{book.access.toUpperCase()}</span></p>
              <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>View Details</button>
            </div>
          ))}
        </div>

        <h3>💼 Professional Concept Books</h3>
        <p>Convert concepts into working engineering systems.</p>
        <div className="cards-grid">
          {books?.professional.map(book => (
            <div key={book.id} className="card">
              <h4>{book.title}</h4>
              <p><strong>Level:</strong> {book.level}</p>
              <p><strong>Access:</strong> <span style={{ color: 'orange', fontWeight: 'bold' }}>{book.access.toUpperCase()}</span></p>
              <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>View Details</button>
            </div>
          ))}
        </div>

        <h3>🔬 Research & Development Books</h3>
        <p>Advanced systems, innovation & research thinking.</p>
        <div className="cards-grid">
          {books?.research.map(book => (
            <div key={book.id} className="card">
              <h4>{book.title}</h4>
              <p><strong>Level:</strong> {book.level}</p>
              <p><strong>Access:</strong> <span style={{ color: 'red', fontWeight: 'bold' }}>{book.access.toUpperCase()}</span></p>
              <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>View Details</button>
            </div>
          ))}
        </div>

        <h2 style={{ marginTop: '3rem' }}>Request Book Information</h2>
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
            value={formData.level}
            onChange={(e) => setFormData({...formData, level: e.target.value})}
            required
          >
            <option value="">Select Level</option>
            <option value="foundation">Foundation</option>
            <option value="professional">Professional</option>
            <option value="research">Research & Development</option>
          </select>
          <select 
            value={formData.interest}
            onChange={(e) => setFormData({...formData, interest: e.target.value})}
            required
          >
            <option value="">Area of Interest</option>
            <option value="electronics">Electronics</option>
            <option value="sensors">Sensors & Measurement</option>
            <option value="embedded">Embedded Systems</option>
            <option value="industrial">Industrial Automation</option>
          </select>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Request Book</button>
        </form>
        {message && <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}
      </section>
    </div>
  );
}

export default ConceptBooks;
