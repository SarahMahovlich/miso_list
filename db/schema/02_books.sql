-- Drop and recreate Books table (Example)

DROP TABLE IF EXISTS books CASCADE;
CREATE TABLE books (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  context TEXT
);
