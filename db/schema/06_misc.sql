-- Drop and recreate Misc table (Example)

DROP TABLE IF EXISTS misc CASCADE;
CREATE TABLE misc (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  context TEXT,
  is_active BOOLEAN DEFAULT TRUE
);
