const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ================================
// THREE MAIN CONTENT CATEGORIES
// ================================
const MAIN_CATEGORIES = {
  conceptBooks: {
    id: 1,
    name: 'Concept Books & Learning',
    icon: 'book',
    color: '#4CAF50',
    description: 'From basic foundations to research-based knowledge'
  },
  products: {
    id: 2,
    name: 'Products & Solutions',
    icon: 'package',
    color: '#2196F3',
    description: 'Hardware and integrated solutions'
  },
  research: {
    id: 3,
    name: 'Research & Innovation',
    icon: 'flask',
    color: '#FF9800',
    description: 'Research papers and advanced projects'
  }
};

// ========================
// HEALTH CHECK
// ========================
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running', timestamp: new Date() });
});

// ========================
// MAIN CATEGORIES ENDPOINT
// ========================
app.get('/api/main-categories', (req, res) => {
  res.json(Object.values(MAIN_CATEGORIES));
});

// ========================
// 1. CONCEPT BOOKS & LEARNING
// ========================
const conceptBooks = {
  basic: {
    level: 'Basic Conceptual Foundation',
    description: 'Beginner-friendly fundamentals',
    access: 'free',
    books: [
      { id: 1, title: 'Foundations of Electronics & Measurement', author: 'C-TECH Team', pages: 120, access: 'free' },
      { id: 2, title: 'Sensor Basics for Engineers', author: 'C-TECH Team', pages: 150, access: 'free' },
      { id: 3, title: 'Understanding Signals – A Conceptual Approach', author: 'C-TECH Team', pages: 180, access: 'free' },
      { id: 4, title: 'Measurement Fundamentals', author: 'C-TECH Team', pages: 140, access: 'free' }
    ]
  },
  professional: {
    level: 'Professional Skills & Applications',
    description: 'Intermediate to advanced practical knowledge',
    access: 'paid',
    price: '₹5,000',
    books: [
      { id: 5, title: 'Practical Instrumentation System Design', author: 'C-TECH Team', pages: 250, access: 'paid' },
      { id: 6, title: 'Embedded Systems for Industrial Applications', author: 'C-TECH Team', pages: 280, access: 'paid' },
      { id: 7, title: 'Sensor Signal Conditioning – Field Proven Methods', author: 'C-TECH Team', pages: 220, access: 'paid' },
      { id: 8, title: 'Industrial Communication Protocols', author: 'C-TECH Team', pages: 200, access: 'paid' }
    ]
  },
  research: {
    level: 'Research-Based Product Knowledge',
    description: 'Advanced research methodologies and innovations',
    access: 'paid',
    price: '₹10,000',
    books: [
      { id: 9, title: 'Advanced Precision Measurement Systems', author: 'C-TECH Team', pages: 350, access: 'paid' },
      { id: 10, title: 'R&D Engineering: From Problem to Innovation', author: 'C-TECH Team', pages: 300, access: 'paid' },
      { id: 11, title: 'Intelligent Sensors & AI-Assisted Instrumentation', author: 'C-TECH Team', pages: 400, access: 'paid' },
      { id: 12, title: 'Advanced Signal Processing & Analysis', author: 'C-TECH Team', pages: 380, access: 'paid' }
    ]
  }
};

app.get('/api/concept-books', (req, res) => {
  res.json({ category: 'Concept Books & Learning', data: conceptBooks });
});

app.get('/api/concept-books/:level', (req, res) => {
  const level = req.params.level;
  if (!conceptBooks[level]) {
    return res.status(404).json({ error: 'Level not found. Use: basic, professional, research' });
  }
  res.json({ level, data: conceptBooks[level] });
});

// ========================
// 2. PRODUCTS & SOLUTIONS
// ========================
const products = {
  foundation: {
    level: 'Basic Technological Foundation',
    description: 'Entry-level educational products',
    access: 'free',
    products: [
      { id: 1, name: 'Sensor Demonstration Kit', type: 'Educational', components: ['Load Cell', 'Temperature Sensor', 'Pressure Sensor'], access: 'free' },
      { id: 2, name: 'Basic Measurement Trainer', type: 'Educational', components: ['Arduino Board', 'Sensors', 'Display Module'], access: 'free' },
      { id: 3, name: 'Signal Analysis Workbench', type: 'Educational', components: ['Function Generator', 'Oscilloscope Simulator', 'Software'], access: 'free' }
    ]
  },
  industrial: {
    level: 'Industrial Level Solutions',
    description: 'Professional-grade production systems',
    access: 'paid',
    price: '₹50,000 - ₹2,00,000',
    products: [
      { id: 4, name: 'Precision Weight Measurement System', type: 'Industrial', specs: 'Load Cell + ADC + Controller', access: 'paid' },
      { id: 5, name: 'Dynamic Checkweigher Controller', type: 'Industrial', specs: 'Real-time weighing, Multiple lanes', access: 'paid' },
      { id: 6, name: 'Industrial DAQ System', type: 'Industrial', specs: '16-channel, Multi-sensor support', access: 'paid' },
      { id: 7, name: 'Metal Detection & Weight Integration', type: 'Industrial', specs: 'Combined detection system', access: 'paid' }
    ]
  },
  research: {
    level: 'Research & Advanced Products',
    description: 'Cutting-edge R&D solutions',
    access: 'paid',
    price: '₹3,00,000+',
    products: [
      { id: 8, name: 'AI-Assisted Metal Detection System', type: 'Innovation', specs: 'AI-powered, Precision: 99.5%', access: 'paid' },
      { id: 9, name: 'Advanced Dynamic Measurement Platform', type: 'Innovation', specs: 'Multi-parameter analysis, Real-time', access: 'paid' },
      { id: 10, name: 'Intelligent Sensor Fusion System', type: 'Innovation', specs: 'ML-based data fusion, Edge computing', access: 'paid' },
      { id: 11, name: 'Quantum Sensor Integration Suite', type: 'Innovation', specs: 'Next-gen precision measurement', access: 'paid' }
    ]
  }
};

app.get('/api/products', (req, res) => {
  res.json({ category: 'Products & Solutions', data: products });
});

app.get('/api/products/:level', (req, res) => {
  const level = req.params.level;
  if (!products[level]) {
    return res.status(404).json({ error: 'Level not found. Use: foundation, industrial, research' });
  }
  res.json({ level, data: products[level] });
});

// ========================
// 3. RESEARCH & INNOVATION
// ========================
const research = {
  papers: {
    category: 'Research Papers & Publications',
    description: 'Peer-reviewed research publications',
    access: 'paid',
    items: [
      { id: 1, title: 'High-Precision Load Cell Characterization Using AI', type: 'Journal Paper', author: 'Dr. Smith et al.', year: 2024, access: 'paid' },
      { id: 2, title: 'Real-Time Signal Processing in Industrial IoT', type: 'Conference Paper', author: 'Prof. Johnson', year: 2024, access: 'paid' },
      { id: 3, title: 'Sensor Fusion for Enhanced Measurement Accuracy', type: 'Journal Paper', author: 'Dr. Patel et al.', year: 2023, access: 'paid' },
      { id: 4, title: 'Machine Learning in Instrumentation Systems', type: 'Technical Report', author: 'C-TECH Research Lab', year: 2024, access: 'paid' }
    ]
  },
  projects: {
    category: 'Research Projects & Case Studies',
    description: 'Completed and ongoing research initiatives',
    access: 'paid',
    items: [
      { id: 5, title: 'Precision Measurement in Pharmaceutical Manufacturing', type: 'Case Study', status: 'Completed', access: 'paid' },
      { id: 6, title: 'AI-Based Quality Control System Development', type: 'Active Project', status: 'Ongoing', access: 'paid' },
      { id: 7, title: 'Real-Time Sensor Health Monitoring', type: 'Research Project', status: 'Completed', access: 'paid' },
      { id: 8, title: 'IoT Integration for Multi-Factory Monitoring', type: 'Active Project', status: 'Ongoing', access: 'paid' }
    ]
  },
  advancedProducts: {
    category: 'Research-Level Advanced Products',
    description: 'Experimental and prototype systems',
    access: 'paid',
    items: [
      { id: 9, name: 'Ultra-Low-Noise Amplifier Suite', type: 'Research Equipment', specs: 'Noise floor: <1μV', access: 'paid' },
      { id: 10, name: 'Multi-Channel Precision DAQ', type: 'Research Equipment', specs: '24-bit resolution, 1MHz sampling', access: 'paid' },
      { id: 11, name: 'Quantum Sensor Development Kit', type: 'Prototype', specs: 'Next-gen measurement technology', access: 'paid' },
      { id: 12, name: 'AI-ML Integration Platform', type: 'Research Platform', specs: 'Edge computing + Cloud analytics', access: 'paid' }
    ]
  }
};

app.get('/api/research', (req, res) => {
  res.json({ category: 'Research & Innovation', data: research });
});

app.get('/api/research/:type', (req, res) => {
  const type = req.params.type;
  if (!research[type]) {
    return res.status(404).json({ error: 'Type not found. Use: papers, projects, advancedProducts' });
  }
  res.json({ type, data: research[type] });
});

// ========================
// UNIFIED CONTENT ENDPOINT
// ========================
app.get('/api/all-content', (req, res) => {
  res.json({
    categories: MAIN_CATEGORIES,
    conceptBooks,
    products,
    research
  });
});

// ========================
// FORM SUBMISSIONS
// ========================
app.post('/api/inquiries', (req, res) => {
  const { name, email, category, type, message } = req.body;
  console.log('Inquiry:', { name, email, category, type, message, timestamp: new Date() });
  res.json({ success: true, message: 'Your inquiry has been received. We will contact you soon.' });
});

app.post('/api/book-download-request', (req, res) => {
  const { name, email, bookId, category } = req.body;
  console.log('Book Download Request:', { name, email, bookId, category, timestamp: new Date() });
  res.json({ success: true, message: 'Book access link will be sent to your email.' });
});

app.post('/api/product-inquiry', (req, res) => {
  const { name, email, productId, requirement, budget } = req.body;
  console.log('Product Inquiry:', { name, email, productId, requirement, budget, timestamp: new Date() });
  res.json({ success: true, message: 'Our team will contact you with product recommendations.' });
});

app.post('/api/research-inquiry', (req, res) => {
  const { name, email, type, topic, description } = req.body;
  console.log('Research Inquiry:', { name, email, type, topic, description, timestamp: new Date() });
  res.json({ success: true, message: 'Research opportunity will be reviewed and we will contact you.' });
});

// ========================
// ERROR HANDLING
// ========================
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🔵 C-TECH Backend Server running on http://localhost:${PORT}`);
  console.log('\n📚 THREE MAIN CONTENT CATEGORIES:');
  console.log(`  1. Concept Books & Learning (Foundation → Professional → Research)`);
  console.log(`  2. Products & Solutions (Basic → Industrial → Advanced R&D)`);
  console.log(`  3. Research & Innovation (Papers → Projects → Advanced Products)`);
  console.log('\n📂 API ENDPOINTS:');
  console.log(`  • GET /api/main-categories`);
  console.log(`  • GET /api/concept-books/{basic|professional|research}`);
  console.log(`  • GET /api/products/{foundation|industrial|research}`);
  console.log(`  • GET /api/research/{papers|projects|advancedProducts}`);
  console.log(`  • GET /api/all-content`);
  console.log('\n💬 FORM ENDPOINTS:');
  console.log(`  • POST /api/inquiries`);
  console.log(`  • POST /api/book-download-request`);
  console.log(`  • POST /api/product-inquiry`);
  console.log(`  • POST /api/research-inquiry\n`);
});
