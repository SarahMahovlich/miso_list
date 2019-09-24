const { searchEngine } = require('../lib/searchEngine');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const getAllThings = () => {
  let returnObj = {};
  let queryString = `
  SELECT *
  FROM products;
  `;
  return pool.query(queryString)
    .then((data) => {
      returnObj['products'] = data.rows;
      let queryString = `
      SELECT *
      FROM books;
      `;
      return pool.query(queryString)
        .then((data) => {
          returnObj['books'] = data.rows;
          let queryString = `
          SELECT *
          FROM movies_and_series;
          `;
          return pool.query(queryString)
            .then((data) => {
              returnObj['movies_and_series'] = data.rows;
              let queryString = `
              SELECT *
              FROM restaurants;
              `;
              return pool.query(queryString)
                .then((data) => {
                  returnObj['restaurants'] = data.rows;
                  let queryString = `
                  SELECT *
                  FROM misc;
                  `;
                  return pool.query(queryString)
                    .then((data) => {
                      returnObj['misc'] = data.rows;
                      return returnObj;
                    });
                });
            });
        });
    });
};




const addToWatch = (body, query) => {
  return pool.query(`
  INSERT INTO movies_and_series (name, context)
    VALUES ($1, $2)
    RETURNING *;
  `, [query, body.items[0]['snippet']])
    .then(res => res.rows[0]);
};


const addToRead = (body, query) => {
  return pool.query(`
  INSERT INTO books (name, context)
  VALUES ($1, $2)
  RETURNING *;
  `, [query, body.items[0]['snippet']])
    .then(res => res.rows[0]);
};



const addToEat = (body, query) => {
  return pool.query(`
  INSERT INTO restaurants (name, context)
  VALUES ($1, $2)
  RETURNING *;
  `, [query, body.items[0]['snippet']])
    .then(res => res.rows[0]);
};



const addToBuy = (body, query) => {
  return pool.query(`
  INSERT INTO products (name, context)
  VALUES ($1, $2)
  RETURNING *;
  `, [query, body.items[0]['snippet']])
    .then(res => res.rows[0]);
};


const editBooks = (formInput, listItem) => {
  console.log('formInput =', formInput);
  return pool.query(`
  UPDATE books
  SET name = $1
  WHERE name = $2;
  `, [formInput, listItem])
    .then(res => res.rows[0]);
};
module.exports = { getAllThings, addToWatch, addToRead, addToEat, addToBuy, editBooks };

