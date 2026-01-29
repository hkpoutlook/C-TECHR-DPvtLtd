const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running', timestamp: new Date() });
});

// Concept Books API
app.get('/api/concept-books', (req, res) => {
  res.json({
    foundation: [
      { id: 1, title: 'Foundations of Electronics & Measurement', level: 'Foundation', access: 'free' },
      { id: 2, title: 'Sensor Basics for Engineers', level: 'Foundation', access: 'free' },
      { id: 3, title: 'Understanding Signals – A Conceptual Approach', level: 'Foundation', access: 'free' }
    ],
    professional: [
      { id: 4, title: 'Practical Instrumentation System Design', level: 'Professional', access: 'paid' },
      { id: 5, title: 'Embedded Systems for Industrial Applications', level: 'Professional', access: 'paid' },
      { id: 6, title: 'Sensor Signal Conditioning – Field Proven Methods', level: 'Professional', access: 'paid' }
    ],
    research: [
      { id: 7, title: 'Advanced Precision Measurement Systems', level: 'R&D', access: 'paid' },
      { id: 8, title: 'R&D Engineering: From Problem to Innovation', level: 'R&D', access: 'paid' },
      { id: 9, title: 'Intelligent Sensors & AI-Assisted Instrumentation', level: 'R&D', access: 'paid' }
    ]
  });
});

// Components API
app.get('/api/components', (req, res) => {
  res.json({
    foundation: {
      sensors: ['Load cells', 'Temperature sensors', 'Pressure sensors'],
      microcontrollers: ['Entry-level STM32', 'Arduino-compatible', 'Basic ESP32'],
      access: 'free'
    },
    professional: {
      sensors: ['Industrial load cells', 'High-stability sensors', 'Signal conditioning modules'],
      adcs: ['ADS1256', 'ADS1248', 'NAU7802'],
      microcontrollers: ['STM32F4/F7', 'ESP32-S3'],
      access: 'paid'
    },
    research: {
      highPrecision: ['Ultra-low-noise amplifiers', 'Precision voltage references', 'Research-grade ADCs'],
      advancedSystems: ['Multi-channel DAQ', 'Custom analog front-ends', 'AI-ready modules'],
      access: 'paid'
    }
  });
});

// Products API
app.get('/api/products', (req, res) => {
  res.json({
    foundation: [
      { id: 1, name: 'Sensor Demonstration Kit', category: 'Educational', access: 'free' },
      { id: 2, name: 'Basic Measurement Trainer', category: 'Educational', access: 'free' }
    ],
    professional: [
      { id: 3, name: 'Precision Weight Measurement System', category: 'Industrial', access: 'paid' },
      { id: 4, name: 'Dynamic Checkweigher Controller', category: 'Industrial', access: 'paid' },
      { id: 5, name: 'Industrial DAQ System', category: 'Industrial', access: 'paid' }
    ],
    research: [
      { id: 6, name: 'AI-Assisted Metal Detection System', category: 'Innovation', access: 'paid' },
      { id: 7, name: 'Advanced Dynamic Measurement Platform', category: 'Innovation', access: 'paid' },
      { id: 8, name: 'Intelligent Sensor Fusion System', category: 'Innovation', access: 'paid' }
    ]
  });
});

// Certifications API
app.get('/api/certifications', (req, res) => {
  res.json({
    foundation: {
      name: 'Foundation Certification',
      description: 'Conceptual understanding & fundamentals',
      duration: '4-6 weeks',
      price: 'Free',
      modules: ['Engineering Fundamentals', 'Electronics Basics', 'Sensors & Measurement', 'Signal Basics']
    },
    professional: {
      name: 'Professional Certification',
      description: 'Hands-on skills & guided project',
      duration: '8-10 weeks',
      price: '₹15,000',
      modules: ['Practical Electronics', 'Sensors & Systems', 'ADC & Data Acquisition', 'Firmware Development', 'Industrial Communication']
    },
    research: {
      name: 'Advanced R&D Certification',
      description: 'Independent project & technical evaluation',
      duration: '12-16 weeks',
      price: '₹30,000',
      modules: ['Advanced System Design', 'Precision Measurement', 'Research Methodology', 'AI/ML Integration']
    }
  });
});

// Contact Form Submission
app.post('/api/contact', (req, res) => {
  const { name, email, message, type } = req.body;
  console.log('New inquiry:', { name, email, message, type });
  res.json({ success: true, message: 'Inquiry received. We will contact you soon.' });
});

// User Input for Books
app.post('/api/book-inquiry', (req, res) => {
  const { name, email, level, interest } = req.body;
  console.log('Book inquiry:', { name, email, level, interest });
  res.json({ success: true, message: 'Book recommendation will be sent to your email.' });
});

// Component Inquiry
app.post('/api/component-inquiry', (req, res) => {
  const { name, email, application, requirement } = req.body;
  console.log('Component inquiry:', { name, email, application, requirement });
  res.json({ success: true, message: 'Our team will recommend suitable components.' });
});

// R&D Proposal
app.post('/api/research-proposal', (req, res) => {
  const { name, email, problemStatement, objective } = req.body;
  console.log('R&D Proposal:', { name, email, problemStatement, objective });
  res.json({ success: true, message: 'Your proposal has been submitted for review.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🔵 C-TECH Backend Server running on http://localhost:${PORT}`);
  console.log(`📚 Knowledge API: http://localhost:${PORT}/api/concept-books`);
  console.log(`⚙️  Components API: http://localhost:${PORT}/api/components`);
  console.log(`🚀 Products API: http://localhost:${PORT}/api/products`);
  console.log(`🎓 Certifications API: http://localhost:${PORT}/api/certifications\n`);
});
