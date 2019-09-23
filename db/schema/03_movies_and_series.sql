-- Drop and recreate Movies_and_series table (Example)

DROP TABLE IF EXISTS movies_and_series CASCADE;
CREATE TABLE movies_and_series (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  context TEXT
);
