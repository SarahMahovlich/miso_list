-- Drop and recreate Movies table (Example)

DROP TABLE IF EXISTS movies CASCADE;
CREATE TABLE movies (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  context TEXT
);
