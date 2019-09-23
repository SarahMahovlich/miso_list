const { searchEngine } = require('../lib/searchEngine');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

//to watch

const addToWatch = (query) => {
  return pool.query(`
  INSERT INTO movies_and_series (name, context)
    VALUES ($1, $2)
    RETURNING *;
  `, [query.items[0]['title'], query.items[0]['snippet']])
    .then(res => res.rows[0]);
};

exports.addToWatch = addToWatch;

const addToRead = (query) => {
  return pool.query(`
  INSERT INTO books (name, context)
  VALUES ($1, $2)
  RETURNING *;
  `, [query.items[0]['title'], query.items[0]['snippet']])
    .then(res => res.rows[0]);
};

exports.addToRead = addToRead;

const addToEat = (query) => {
  return pool.query(`
  INSERT INTO restaurants (name, context)
  VALUES ($1, $2)
  RETURNING *;
  `, [query.items[0]['title'], query.items[0]['snippet']])
    .then(res => res.rows[0]);
};

exports.addToEat = addToEat;

const addToBuy = (query) => {
  return pool.query(`
  INSERT INTO products (name, context)
  VALUES ($1, $2)
  RETURNING *;
  `, [query.items[0]['title'], query.items[0]['snippet']])
    .then(res => res.rows[0]);
};

exports.addToBuy = addToBuy;
