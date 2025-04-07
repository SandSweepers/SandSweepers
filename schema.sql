CREATE TABLE cards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  image_url TEXT,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
); 

-- How i sat it up for now