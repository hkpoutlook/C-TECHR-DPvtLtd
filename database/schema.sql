-- C-TECH R&D Database Schema
-- THREE MAIN CONTENT CATEGORIES:
-- 1. Concept Books & Learning (Basic → Professional → Research)
-- 2. Products & Solutions (Foundation → Industrial → Research)
-- 3. Research & Innovation (Papers → Projects → Advanced Products)

-- Main Content Categories Table
CREATE TABLE main_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  icon VARCHAR(50),
  color VARCHAR(20),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Concept Books Table
CREATE TABLE concept_books (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  level VARCHAR(50), -- 'basic', 'professional', 'research'
  access_type VARCHAR(20), -- 'free' or 'paid'
  price DECIMAL(10, 2),
  author VARCHAR(100),
  pages INT,
  cover_url VARCHAR(255),
  download_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table (Three Levels)
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  level VARCHAR(50), -- 'foundation', 'industrial', 'research'
  product_type VARCHAR(100),
  price DECIMAL(12, 2),
  access_type VARCHAR(20),
  specifications JSON,
  image_url VARCHAR(255),
  document_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Research Content Table (Papers, Projects, Advanced Products)
CREATE TABLE research_content (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50), -- 'paper', 'project', 'advanced_product'
  category VARCHAR(50), -- 'papers', 'projects', 'advancedProducts'
  author VARCHAR(100),
  status VARCHAR(50),
  year INT,
  access_type VARCHAR(20),
  url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Inquiries Table
CREATE TABLE inquiries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_name VARCHAR(100) NOT NULL,
  user_email VARCHAR(100) NOT NULL,
  category VARCHAR(100), -- concept_books, products, research
  type VARCHAR(100),
  message TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users Table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20),
  primary_interest VARCHAR(100),
  subscription_tier VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Main Categories
INSERT INTO main_categories (name, icon, color, description) VALUES
('Concept Books & Learning', 'book', '#4CAF50', 'From basic foundations to research-based knowledge'),
('Products & Solutions', 'package', '#2196F3', 'Hardware and integrated solutions'),
('Research & Innovation', 'flask', '#FF9800', 'Research papers and advanced projects');
