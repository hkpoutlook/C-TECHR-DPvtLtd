import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return <div className="container"><div className="loading">Loading products...</div></div>;

  return (
    <div className="container">
      <section>
        <h2>🚀 Products & R&D Project Portfolio</h2>
        <p style={{ textAlign: 'center', fontSize: '1.1rem', marginBottom: '2rem' }}>Foundation → Professional → Research & Development</p>

        <h3>📚 Foundation-Level Products</h3>
        <p>Educational & training systems</p>
        <div className="cards-grid">
          {products?.foundation.map(product => (
            <div key={product.id} className="card">
              <h4>{product.name}</h4>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Access:</strong> <span style={{ color: 'green', fontWeight: 'bold' }}>{product.access.toUpperCase()}</span></p>
              <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Learn More</button>
            </div>
          ))}
        </div>

        <h3>🏭 Professional-Level Products</h3>
        <p>Industrial & commercial systems</p>
        <div className="cards-grid">
          {products?.professional.map(product => (
            <div key={product.id} className="card">
              <h4>{product.name}</h4>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Access:</strong> <span style={{ color: 'orange', fontWeight: 'bold' }}>{product.access.toUpperCase()}</span></p>
              <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>View Details</button>
            </div>
          ))}
        </div>

        <h3>🔬 Research & Development Products</h3>
        <p>Innovation & advanced prototypes</p>
        <div className="cards-grid">
          {products?.research.map(product => (
            <div key={product.id} className="card">
              <h4>{product.name}</h4>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Access:</strong> <span style={{ color: 'red', fontWeight: 'bold' }}>{product.access.toUpperCase()}</span></p>
              <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Inquire</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Products;
