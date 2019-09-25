-- Drop and recreate Products table (Example)

DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  context TEXT,
  link VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE
);
