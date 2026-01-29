import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CategoryView.css';

const CategoryView = () => {
  const [activeCategory, setActiveCategory] = useState('conceptBooks');
  const [activeLevel, setActiveLevel] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 'conceptBooks', name: 'Concept Books & Learning', icon: '📚', color: '#4CAF50' },
    { id: 'products', name: 'Products & Solutions', icon: '📦', color: '#2196F3' },
    { id: 'research', name: 'Research & Innovation', icon: '🔬', color: '#FF9800' }
  ];

  const levels = {
    conceptBooks: ['basic', 'professional', 'research'],
    products: ['foundation', 'industrial', 'research'],
    research: ['papers', 'projects', 'advancedProducts']
  };

  const levelNames = {
    basic: 'Basic Conceptual Foundation',
    professional: 'Professional Skills',
    research: 'Research-Based Knowledge',
    foundation: 'Basic Technology',
    industrial: 'Industrial Level',
    papers: 'Research Papers',
    projects: 'Research Projects',
    advancedProducts: 'Advanced Products'
  };

  useEffect(() => {
    if (activeLevel) {
      fetchContent();
    }
  }, [activeCategory, activeLevel]);

  const fetchContent = async () => {
    setLoading(true);
    try {
      let url = '';
      if (activeCategory === 'conceptBooks') {
        url = `http://localhost:5000/api/concept-books/${activeLevel}`;
      } else if (activeCategory === 'products') {
        url = `http://localhost:5000/api/products/${activeLevel}`;
      } else if (activeCategory === 'research') {
        url = `http://localhost:5000/api/research/${activeLevel}`;
      }
      
      const response = await axios.get(url);
      setContent(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="category-view">
      <h1>Content Library</h1>
      
      {/* Main Categories */}
      <div className="main-categories">
        {categories.map(cat => (
          <div
            key={cat.id}
            className={`category-card ${activeCategory === cat.id ? 'active' : ''}`}
            style={{ borderLeft: `4px solid ${cat.color}` }}
            onClick={() => {
              setActiveCategory(cat.id);
              setActiveLevel(null);
              setContent(null);
            }}
          >
            <div className="category-icon">{cat.icon}</div>
            <h3>{cat.name}</h3>
          </div>
        ))}
      </div>

      {/* Levels for Active Category */}
      {activeCategory && (
        <div className="levels-selector">
          <h2>Select Level</h2>
          <div className="levels-grid">
            {levels[activeCategory].map(level => (
              <button
                key={level}
                className={`level-btn ${activeLevel === level ? 'active' : ''}`}
                onClick={() => setActiveLevel(level)}
              >
                {levelNames[level]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content Display */}
      {loading && <div className="loading">Loading content...</div>}
      
      {content && (
        <div className="content-display">
          {activeCategory === 'conceptBooks' && (
            <div className="concept-books">
              <h2>{content.data.level}</h2>
              <p>{content.data.description}</p>
              <div className="books-grid">
                {content.data.books.map(book => (
                  <div key={book.id} className="book-card">
                    <h4>{book.title}</h4>
                    <p>Author: {book.author}</p>
                    <p>Pages: {book.pages}</p>
                    <span className={`access-badge ${book.access}`}>
                      {book.access === 'free' ? 'Free' : 'Paid'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeCategory === 'products' && (
            <div className="products">
              <h2>{content.data.level}</h2>
              <p>{content.data.description}</p>
              {content.data.price && <p className="price-info">Price Range: {content.data.price}</p>}
              <div className="products-grid">
                {content.data.products.map(product => (
                  <div key={product.id} className="product-card">
                    <h4>{product.name}</h4>
                    <p>Type: {product.type}</p>
                    <p>{product.specs || product.components?.join(', ')}</p>
                    <span className={`access-badge ${product.access}`}>
                      {product.access === 'free' ? 'Free' : 'Paid'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeCategory === 'research' && (
            <div className="research-content">
              <h2>{content.data.category}</h2>
              <p>{content.data.description}</p>
              <div className="research-grid">
                {content.data.items.map(item => (
                  <div key={item.id} className="research-card">
                    <h4>{item.title || item.name}</h4>
                    <p>{item.type}</p>
                    {item.author && <p>By: {item.author}</p>}
                    {item.year && <p>Year: {item.year}</p>}
                    {item.status && <p>Status: {item.status}</p>}
                    <span className={`access-badge ${item.access}`}>
                      {item.access === 'free' ? 'Free' : 'Paid'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryView;
