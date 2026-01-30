-- C-TECH R&D Database - Sample Data for Three Categories

-- Insert Concept Books by Category
INSERT INTO concept_books (title, description, category_id, level, access_type, author) VALUES
-- Foundation Books
('Foundations of Electronics & Measurement', 'Learn the basics of electronics and measurement systems', 1, 'Foundation', 'free', 'C-TECH Team'),
('Sensor Basics for Engineers', 'Introduction to different types of sensors and their applications', 1, 'Foundation', 'free', 'C-TECH Team'),
('Understanding Signals – A Conceptual Approach', 'Conceptual understanding of signal processing', 1, 'Foundation', 'free', 'C-TECH Team'),

-- Professional Books
('Practical Instrumentation System Design', 'Design and implementation of instrumentation systems', 2, 'Professional', 'paid', 'C-TECH Team'),
('Embedded Systems for Industrial Applications', 'Embedded systems in real-world industrial scenarios', 2, 'Professional', 'paid', 'C-TECH Team'),
('Sensor Signal Conditioning – Field Proven Methods', 'Advanced signal conditioning techniques', 2, 'Professional', 'paid', 'C-TECH Team'),

-- Research Books
('Advanced Precision Measurement Systems', 'High-precision measurement and analysis', 3, 'Research', 'paid', 'C-TECH Team'),
('R&D Engineering: From Problem to Innovation', 'Research methodology and innovation process', 3, 'Research', 'paid', 'C-TECH Team'),
('Intelligent Sensors & AI-Assisted Instrumentation', 'AI and ML in sensor systems', 3, 'Research', 'paid', 'C-TECH Team');

-- Insert Components by Category
INSERT INTO components (name, description, category_id, component_type, price) VALUES
-- Foundation Components
('Load Cell - Basic', 'Entry-level load cell for educational purposes', 1, 'sensor', 500),
('Temperature Sensor - LM35', 'Simple temperature sensor for beginners', 1, 'sensor', 300),
('Pressure Sensor - BMP180', 'Basic pressure and altitude sensor', 1, 'sensor', 400),
('Arduino UNO', 'Entry-level microcontroller board', 1, 'microcontroller', 600),
('ESP32 Dev Board', 'Basic IoT-ready microcontroller', 1, 'microcontroller', 800),

-- Professional Components
('Industrial Load Cell - 50kg', 'High-accuracy industrial load cell', 2, 'sensor', 8000),
('RTD Sensor - PT100', 'Industrial temperature sensor', 2, 'sensor', 2000),
('ADS1256', '24-bit ADC for precision measurement', 2, 'adc', 3000),
('STM32F4 Discovery', 'Advanced microcontroller board', 2, 'microcontroller', 2500),
('Signal Conditioning Module', 'Professional signal processing unit', 2, 'module', 5000),

-- Research Components
('Ultra-low-noise Amplifier', 'Precision amplifier for R&D', 3, 'sensor', 15000),
('Precision Voltage Reference', 'High-stability reference for research', 3, 'module', 8000),
('Multi-channel DAQ System', 'Advanced data acquisition system', 3, 'adc', 25000),
('AI-ready Edge Processor', 'ML-capable processing unit', 3, 'microcontroller', 12000),
('Custom Analog Front-End', 'Tailored signal conditioning', 3, 'module', 20000);

-- Insert Products by Category
INSERT INTO products (name, description, category_id, product_type, access_type) VALUES
-- Foundation Products
('Sensor Demonstration Kit', 'Complete kit to learn about sensors', 1, 'educational', 'free'),
('Basic Measurement Trainer', 'Hands-on measurement training system', 1, 'educational', 'free'),

-- Professional Products
('Precision Weight Measurement System', 'Industrial-grade weighing system', 2, 'industrial', 'paid'),
('Dynamic Checkweigher Controller', 'Advanced weight checking controller', 2, 'industrial', 'paid'),
('Industrial DAQ System', 'Multi-channel data acquisition solution', 2, 'industrial', 'paid'),

-- Research Products
('AI-Assisted Metal Detection System', 'Smart metal detection with AI', 3, 'innovation', 'paid'),
('Advanced Dynamic Measurement Platform', 'Next-gen measurement platform', 3, 'innovation', 'paid'),
('Intelligent Sensor Fusion System', 'Multi-sensor intelligent integration', 3, 'innovation', 'paid');

-- Insert Certifications by Category
INSERT INTO certifications (name, description, category_id, duration_weeks, modules) VALUES
('Foundation Certification', 'Conceptual understanding & fundamentals', 1, 6, '["Engineering Fundamentals", "Electronics Basics", "Sensors & Measurement", "Signal Basics"]'),
('Professional Certification', 'Hands-on skills & guided project', 2, 10, '["Practical Electronics", "Sensors & Systems", "ADC & Data Acquisition", "Firmware Development", "Industrial Communication"]'),
('Advanced R&D Certification', 'Independent project & technical evaluation', 3, 16, '["Advanced System Design", "Precision Measurement", "Research Methodology", "AI/ML Integration"]');
