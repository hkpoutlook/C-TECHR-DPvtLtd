-- Payment & Donation System Schema for ctechrnd.com
-- MySQL 5.7+

-- ==========================================
-- USERS TABLE (Enhanced)
-- ==========================================
ALTER TABLE users ADD COLUMN IF NOT EXISTS (
  subscription_tier VARCHAR(50) DEFAULT 'free',
  subscription_start_date DATETIME,
  subscription_end_date DATETIME,
  subscription_auto_renew BOOLEAN DEFAULT false,
  billing_email VARCHAR(255),
  billing_phone VARCHAR(20)
);

-- ==========================================
-- PAYMENTS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  transaction_id VARCHAR(255) UNIQUE NOT NULL,
  product_id INT,
  product_type ENUM('concept_book', 'product', 'research', 'subscription'),
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'INR',
  payment_method ENUM('stripe', 'paypal', 'bank_transfer', 'wallet') DEFAULT 'stripe',
  status ENUM('pending', 'completed', 'failed', 'refunded', 'cancelled') DEFAULT 'pending',
  stripe_payment_intent_id VARCHAR(255),
  paypal_order_id VARCHAR(255),
  invoice_url VARCHAR(500),
  receipt_url VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  metadata JSON,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_transaction_id (transaction_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);

-- ==========================================
-- DONATIONS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS donations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  donor_name VARCHAR(255) NOT NULL,
  donor_email VARCHAR(255),
  donor_phone VARCHAR(20),
  user_id INT,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'INR',
  payment_method ENUM('stripe', 'paypal', 'bank_transfer', 'crypto') DEFAULT 'stripe',
  status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  transaction_id VARCHAR(255) UNIQUE NOT NULL,
  paypal_order_id VARCHAR(255),
  stripe_charge_id VARCHAR(255),
  message TEXT,
  anonymous BOOLEAN DEFAULT false,
  tax_deductible BOOLEAN DEFAULT true,
  receipt_url VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_donor_email (donor_email),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at),
  INDEX idx_amount (amount),
  FULLTEXT INDEX ft_message (message)
);

-- ==========================================
-- SUBSCRIPTIONS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  plan_id VARCHAR(100) NOT NULL,
  plan_name ENUM('basic', 'professional', 'research') DEFAULT 'basic',
  status ENUM('active', 'cancelled', 'suspended', 'expired') DEFAULT 'active',
  stripe_subscription_id VARCHAR(255),
  paypal_subscription_id VARCHAR(255),
  amount DECIMAL(10, 2) NOT NULL,
  billing_cycle ENUM('monthly', 'quarterly', 'annual') DEFAULT 'monthly',
  start_date DATETIME NOT NULL,
  end_date DATETIME,
  next_billing_date DATETIME,
  auto_renew BOOLEAN DEFAULT true,
  payment_method VARCHAR(50),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_stripe_sub (stripe_subscription_id),
  UNIQUE KEY unique_paypal_sub (paypal_subscription_id),
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_end_date (end_date)
);

-- ==========================================
-- INVOICES TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS invoices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  payment_id INT,
  subscription_id INT,
  donation_id INT,
  user_id INT,
  amount DECIMAL(10, 2) NOT NULL,
  tax_amount DECIMAL(10, 2) DEFAULT 0,
  total_amount DECIMAL(10, 2) NOT NULL,
  status ENUM('draft', 'issued', 'paid', 'cancelled') DEFAULT 'issued',
  issued_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  due_date DATETIME,
  paid_date DATETIME,
  invoice_pdf_url VARCHAR(500),
  notes TEXT,
  
  FOREIGN KEY (payment_id) REFERENCES payments(id) ON DELETE SET NULL,
  FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE SET NULL,
  FOREIGN KEY (donation_id) REFERENCES donations(id) ON DELETE SET NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_invoice_number (invoice_number),
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_issued_date (issued_date)
);

-- ==========================================
-- REFUNDS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS refunds (
  id INT AUTO_INCREMENT PRIMARY KEY,
  payment_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  reason VARCHAR(500),
  status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
  transaction_id VARCHAR(255),
  stripe_refund_id VARCHAR(255),
  paypal_refund_id VARCHAR(255),
  requested_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_date DATETIME,
  notes TEXT,
  
  FOREIGN KEY (payment_id) REFERENCES payments(id) ON DELETE CASCADE,
  INDEX idx_payment_id (payment_id),
  INDEX idx_status (status),
  INDEX idx_requested_date (requested_date)
);

-- ==========================================
-- PAYMENT_EVENTS TABLE (Webhook Logging)
-- ==========================================
CREATE TABLE IF NOT EXISTS payment_events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id VARCHAR(255) UNIQUE NOT NULL,
  event_type VARCHAR(100) NOT NULL,
  source ENUM('stripe', 'paypal') DEFAULT 'stripe',
  payment_id INT,
  transaction_id VARCHAR(255),
  payload JSON,
  status ENUM('received', 'processed', 'failed') DEFAULT 'received',
  error_message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  processed_at DATETIME,
  
  FOREIGN KEY (payment_id) REFERENCES payments(id) ON DELETE SET NULL,
  INDEX idx_event_id (event_id),
  INDEX idx_event_type (event_type),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);

-- ==========================================
-- PAYMENT_LOGS TABLE (Audit Trail)
-- ==========================================
CREATE TABLE IF NOT EXISTS payment_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  payment_id INT,
  action VARCHAR(100) NOT NULL,
  old_status VARCHAR(50),
  new_status VARCHAR(50),
  changed_by INT,
  change_reason TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (payment_id) REFERENCES payments(id) ON DELETE CASCADE,
  FOREIGN KEY (changed_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_payment_id (payment_id),
  INDEX idx_action (action),
  INDEX idx_created_at (created_at)
);

-- ==========================================
-- PROMOTIONAL_CODES TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS promotional_codes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  description VARCHAR(255),
  discount_type ENUM('percentage', 'fixed') DEFAULT 'percentage',
  discount_value DECIMAL(10, 2) NOT NULL,
  max_uses INT,
  used_count INT DEFAULT 0,
  max_uses_per_user INT DEFAULT 1,
  valid_from DATETIME,
  valid_until DATETIME,
  applicable_to ENUM('payments', 'subscriptions', 'donations', 'all') DEFAULT 'all',
  created_by INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_code (code),
  INDEX idx_valid_until (valid_until),
  INDEX idx_applicable_to (applicable_to)
);

-- ==========================================
-- PROMO_CODE_USAGE TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS promo_code_usage (
  id INT AUTO_INCREMENT PRIMARY KEY,
  promo_code_id INT NOT NULL,
  user_id INT NOT NULL,
  payment_id INT,
  discount_amount DECIMAL(10, 2),
  used_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (promo_code_id) REFERENCES promotional_codes(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (payment_id) REFERENCES payments(id) ON DELETE SET NULL,
  INDEX idx_promo_code_id (promo_code_id),
  INDEX idx_user_id (user_id)
);

-- ==========================================
-- PAYMENT_PLANS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS payment_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  tier ENUM('basic', 'professional', 'research') DEFAULT 'basic',
  description TEXT,
  monthly_price DECIMAL(10, 2),
  quarterly_price DECIMAL(10, 2),
  annual_price DECIMAL(10, 2),
  features JSON,
  access_level INT DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  UNIQUE KEY unique_tier (tier),
  INDEX idx_is_active (is_active)
);

-- ==========================================
-- DONATION_CAMPAIGNS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS donation_campaigns (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  goal_amount DECIMAL(12, 2),
  current_amount DECIMAL(12, 2) DEFAULT 0,
  category VARCHAR(100),
  start_date DATETIME,
  end_date DATETIME,
  image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  created_by INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_is_active (is_active),
  INDEX idx_end_date (end_date)
);

-- ==========================================
-- DONATION_CAMPAIGN_ITEMS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS donation_campaign_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  campaign_id INT NOT NULL,
  donation_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (campaign_id) REFERENCES donation_campaigns(id) ON DELETE CASCADE,
  FOREIGN KEY (donation_id) REFERENCES donations(id) ON DELETE CASCADE,
  UNIQUE KEY unique_campaign_donation (campaign_id, donation_id)
);

-- ==========================================
-- VIEWS FOR ANALYTICS
-- ==========================================

-- Monthly Revenue View
CREATE OR REPLACE VIEW monthly_revenue AS
SELECT 
  DATE_FORMAT(created_at, '%Y-%m') AS month,
  COUNT(*) AS transaction_count,
  SUM(amount) AS total_revenue,
  AVG(amount) AS average_transaction
FROM payments
WHERE status = 'completed'
GROUP BY DATE_FORMAT(created_at, '%Y-%m')
ORDER BY month DESC;

-- Payment Method Distribution View
CREATE OR REPLACE VIEW payment_method_distribution AS
SELECT 
  payment_method,
  COUNT(*) AS count,
  SUM(amount) AS total_amount,
  ROUND(100 * COUNT(*) / (SELECT COUNT(*) FROM payments WHERE status = 'completed'), 2) AS percentage
FROM payments
WHERE status = 'completed'
GROUP BY payment_method;

-- Top Donors View
CREATE OR REPLACE VIEW top_donors AS
SELECT 
  donor_email,
  donor_name,
  COUNT(*) AS donation_count,
  SUM(amount) AS total_donated,
  AVG(amount) AS average_donation,
  MAX(created_at) AS last_donation_date
FROM donations
WHERE status = 'completed' AND anonymous = false
GROUP BY donor_email
ORDER BY total_donated DESC
LIMIT 100;

-- Subscription Performance View
CREATE OR REPLACE VIEW subscription_performance AS
SELECT 
  plan_name,
  COUNT(*) AS active_subscriptions,
  SUM(amount) AS monthly_recurring_revenue,
  ROUND(AVG(amount), 2) AS average_value
FROM subscriptions
WHERE status = 'active'
GROUP BY plan_name;

-- ==========================================
-- INDEXES FOR PERFORMANCE
-- ==========================================

CREATE INDEX idx_payments_user_created ON payments(user_id, created_at);
CREATE INDEX idx_payments_status_created ON payments(status, created_at);
CREATE INDEX idx_donations_status_created ON donations(status, created_at);
CREATE INDEX idx_donations_amount ON donations(amount DESC);
CREATE INDEX idx_subscriptions_user_status ON subscriptions(user_id, status);
CREATE INDEX idx_invoices_user_issued ON invoices(user_id, issued_date);

-- ==========================================
-- STORED PROCEDURES
-- ==========================================

DELIMITER //

-- Get User Payment History
CREATE PROCEDURE GetUserPaymentHistory(IN user_id INT)
BEGIN
  SELECT * FROM payments 
  WHERE user_id = user_id
  ORDER BY created_at DESC;
END //

-- Calculate Subscription Revenue
CREATE PROCEDURE CalculateSubscriptionRevenue(IN start_date DATETIME, IN end_date DATETIME)
BEGIN
  SELECT 
    plan_name,
    COUNT(*) AS subscription_count,
    SUM(amount) AS total_mrr
  FROM subscriptions
  WHERE status = 'active' 
  AND created_at BETWEEN start_date AND end_date
  GROUP BY plan_name;
END //

-- Process Subscription Renewal
CREATE PROCEDURE ProcessSubscriptionRenewal(IN subscription_id INT)
BEGIN
  UPDATE subscriptions 
  SET end_date = DATE_ADD(end_date, INTERVAL 1 MONTH)
  WHERE id = subscription_id AND status = 'active';
END //

-- Update Payment Status
CREATE PROCEDURE UpdatePaymentStatus(IN payment_id INT, IN new_status VARCHAR(50))
BEGIN
  UPDATE payments 
  SET status = new_status, updated_at = NOW()
  WHERE id = payment_id;
END //

DELIMITER ;
