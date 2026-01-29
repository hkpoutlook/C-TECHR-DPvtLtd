import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CategoryView from './components/CategoryView';
import Home from './pages/Home';
import About from './pages/About';
import ConceptBooks from './pages/ConceptBooks';
import Components from './pages/Components';
import Products from './pages/Products';
import Certifications from './pages/Certifications';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<CategoryView />} />
            <Route path="/about" element={<About />} />
            <Route path="/concept-books" element={<ConceptBooks />} />
            <Route path="/components" element={<Components />} />
            <Route path="/products" element={<Products />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
