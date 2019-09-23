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
  pool.query(queryString)
    .then((data) => {
      console.log(data.rows);
      returnObj.products = data.rows;
      let queryString = `
      SELECT *
      FROM books;
      `;
      pool.query(queryString)
        .then((data) => {
          console.log(data.rows);
          returnObj.books = data.rows;
          let queryString = `
          SELECT *
          FROM movies_and_series;
          `;
          pool.query(queryString)
            .then((data) => {
              console.log(data.rows);
              returnObj.movies_and_series = data.rows;
              let queryString = `
              SELECT *
              FROM restaurants;
              `;
              pool.query(queryString)
                .then((data) => {
                  console.log(data.rows);
                  returnObj.restaurants = data.rows;
                  let queryString = `
                  SELECT *
                  FROM misc;
                  `;
                  pool.query(queryString)
                    .then((data) => {
                      console.log(data.rows);
                      returnObj.misc = data.rows;
                      return returnObj;
                    });
                });
            });
        });
    });
};




const addToWatch = (query) => {
  return pool.query(`
  INSERT INTO movies_and_series (name, context)
    VALUES ($1, $2)
    RETURNING *;
  `, [query.items[0]['title'], query.items[0]['snippet']])
    .then(res => res.rows[0]);
};


const addToRead = (query) => {
  return pool.query(`
  INSERT INTO books (name, context)
  VALUES ($1, $2)
  RETURNING *;
  `, [query.items[0]['title'], query.items[0]['snippet']])
    .then(res => res.rows[0]);
};



const addToEat = (query) => {
  return pool.query(`
  INSERT INTO restaurants (name, context)
  VALUES ($1, $2)
  RETURNING *;
  `, [query.items[0]['title'], query.items[0]['snippet']])
    .then(res => res.rows[0]);
};



const addToBuy = (query) => {
  return pool.query(`
  INSERT INTO products (name, context)
  VALUES ($1, $2)
  RETURNING *;
  `, [query.items[0]['title'], query.items[0]['snippet']])
    .then(res => res.rows[0]);
};

module.exports = { getAllThings, addToWatch, addToRead, addToEat, addToBuy };

