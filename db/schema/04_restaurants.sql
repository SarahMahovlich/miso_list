-- Drop and recreate Restaurants table (Example)

DROP TABLE IF EXISTS restaurants CASCADE;
CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  context TEXT,
  link VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE
);
