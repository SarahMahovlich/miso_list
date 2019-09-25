-- Drop and recreate Movies_and_series table (Example)

DROP TABLE IF EXISTS movies_and_series CASCADE;
CREATE TABLE movies_and_series (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  context TEXT,
  link VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE
);
