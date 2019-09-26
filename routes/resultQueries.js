const { searchEngine } = require('../lib/searchEngine');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

// look at how to chain promises!
const getAllThings = () => {
  let returnObj = {};
  let queryString = `
  SELECT *
  FROM products
  WHERE is_active = true;
  `;
  return pool.query(queryString)
    .then((data) => {
      returnObj['products'] = data.rows;
      let queryString = `
      SELECT *
      FROM books
      WHERE is_active = true;
      `;
      return pool.query(queryString)
        .then((data) => {
          returnObj['books'] = data.rows;
          let queryString = `
          SELECT *
          FROM movies_and_series
          WHERE is_active = true;
          `;
          return pool.query(queryString)
            .then((data) => {
              returnObj['movies_and_series'] = data.rows;
              let queryString = `
              SELECT *
              FROM restaurants
              WHERE is_active = true;
              `;
              return pool.query(queryString)
                .then((data) => {
                  returnObj['restaurants'] = data.rows;
                  let queryString = `
                  SELECT *
                  FROM misc
                  WHERE is_active = true;
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

const getUser = (email) => {
  let queryString = `
  SELECT *
  FROM users
  WHERE email = $1;
  `;
  return pool.query(queryString, [email])
    .then(res => res.rows[0]);
};

const getArchivedThings = () => {
  let returnObj = {};
  let queryString = `
  SELECT *
  FROM products
  WHERE is_active = false;
  `;
  return pool.query(queryString)
    .then((data) => {
      returnObj['products'] = data.rows;
      let queryString = `
      SELECT *
      FROM books
      WHERE is_active = false;
      `;
      return pool.query(queryString)
        .then((data) => {
          returnObj['books'] = data.rows;
          let queryString = `
          SELECT *
          FROM movies_and_series
          WHERE is_active = false;
          `;
          return pool.query(queryString)
            .then((data) => {
              returnObj['movies_and_series'] = data.rows;
              let queryString = `
              SELECT *
              FROM restaurants
              WHERE is_active = false;
              `;
              return pool.query(queryString)
                .then((data) => {
                  returnObj['restaurants'] = data.rows;
                  let queryString = `
                  SELECT *
                  FROM misc
                  WHERE is_active = false;
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
  INSERT INTO movies_and_series (name, context, link)
    VALUES ($1, $2, $3)
    RETURNING *;
  `, [query, body.items[0]['snippet'], body.items[0]['link']])
    .then(res => res.rows[0]);
};


const addToRead = (body, query) => {
  if (body.spelling) {
    query = body.spelling.correctedQuery;
  }
  return pool.query(`
  INSERT INTO books (name, context, link)
  VALUES ($1, $2, $3)
  RETURNING *;
  `, [query, body.items[0]['snippet'], body.items[0]['link']])
    .then(res => res.rows[0]);
};



const addToEat = (body, query) => {
  if (body.spelling) {
    query = body.spelling.correctedQuery;
  }
  return pool.query(`
  INSERT INTO restaurants (name, context, link)
  VALUES ($1, $2, $3)
  RETURNING *;
  `, [query, body.items[0]['snippet'], body.items[0]['link']])
    .then(res => res.rows[0]);
};



const addToBuy = (body, query) => {
  if (body.spelling) {
    query = body.spelling.correctedQuery;
  }
  return pool.query(`
  INSERT INTO products (name, context, link)
  VALUES ($1, $2, $3)
  RETURNING *;
  `, [query, body.items[0]['snippet'], body.items[0]['link']])
    .then(res => res.rows[0]);
};

const addToMisc = (query) => {
  return pool.query(`
  INSERT INTO misc (name, context)
  VALUES ($1, $2)
  RETURNING *;
  `, [query, ''])
    .then(res => res.rows[0]);
};

const editBooks = (formInput, listItem) => {
  return pool.query(`
  UPDATE books
  SET name = $1
  WHERE id = $2 AND is_active = true;
  `, [formInput, listItem])
    .then(res => res.rows[0]);
};

const editProducts = (formInput, listItem) => {
  return pool.query(`
  UPDATE products
  SET name = $1
  WHERE id = $2 AND is_active = true;
  `, [formInput, listItem])
    .then(res => res.rows[0]);
};

const editMovies = (formInput, listItem) => {
  return pool.query(`
  UPDATE movies_and_series
  SET name = $1
  WHERE id = $2 AND is_active = true;
  `, [formInput, listItem])
    .then(res => res.rows[0]);
};

const editRestaurants = (formInput, listItem) => {
  return pool.query(`
  UPDATE restaurants
  SET name = $1
  WHERE id = $2 AND is_active = true;
  `, [formInput, listItem])
    .then(res => res.rows[0]);
};

const editMisc = (formInput, listItem) => {
  return pool.query(`
  UPDATE misc
  SET name = $1
  WHERE id = $2 AND is_active = true;
  `, [formInput, listItem])
    .then(res => res.rows[0]);
};

const deleteBooks = (listItem) => {
  return pool.query(`
  DELETE
  FROM books
  WHERE id = $1 AND is_active = true;
  `, [listItem])
    .then(res => res.rows[0]);
};

const deleteProducts = (listItem) => {
  return pool.query(`
  DELETE
  FROM products
  WHERE id = $1 AND is_active = true;
  `, [listItem])
    .then(res => res.rows[0]);
};

const deleteMovies = (listItem) => {
  return pool.query(`
  DELETE
  FROM movies_and_series
  WHERE id = $1 AND is_active = true;
  `, [listItem])
    .then(res => res.rows[0]);
};

const deleteRestaurants = (listItem) => {
  return pool.query(`
  DELETE
  FROM restaurants
  WHERE id = $1 AND is_active = true;
  `, [listItem])
    .then(res => res.rows[0]);
};

const deleteMisc = (listItem) => {
  return pool.query(`
  DELETE
  FROM misc
  WHERE id = $1 AND is_active = true;
  `, [listItem])
    .then(res => res.rows[0]);
};

//Archive and Unarchive
const markCompleteItem = (table, id) => {
  return pool.query(`
  UPDATE ${table}
  SET is_active = false
  WHERE id = $1;
  `, [id])
    .then(res => res.rows[0]);
};

const markUnCompleteItem = (table, id) => {
  return pool.query(`
  UPDATE ${table}
  SET is_active = true
  WHERE id = $1;
  `, [id])
    .then(res => res.rows[0]);
};

const recatergorizeIntoMovies = (name, context) => {
  return pool.query(`
  INSERT INTO movies_and_series (name, context)
    VALUES ($1, $2)
    RETURNING *;
  `, [name, context])
    .then(res => res.rows[0]);
};

const recatergorizeIntoBooks = (name, context) => {
  return pool.query(`
  INSERT INTO books (name, context)
    VALUES ($1, $2)
    RETURNING *;
  `, [name, context])
    .then(res => res.rows[0]);
};

const recatergorizeIntoProducts = (name, context) => {
  return pool.query(`
  INSERT INTO products (name, context)
    VALUES ($1, $2)
    RETURNING *;
  `, [name, context])
    .then(res => res.rows[0]);
};

const recatergorizeIntoRestaurants = (name, context) => {
  return pool.query(`
  INSERT INTO restaurants (name, context)
    VALUES ($1, $2)
    RETURNING *;
  `, [name, context])
    .then(res => res.rows[0]);
};

const recatergorizeIntoMisc = (name, context) => {
  return pool.query(`
  INSERT INTO misc (name, context)
    VALUES ($1, $2)
    RETURNING *;
  `, [name, context])
    .then(res => res.rows[0]);
};

const newUserDB = (username, name, password) => {
  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `, [username, name, password])
    .then(res => res.rows[0]);
};

const PasswordEmail = (email) => {
  return pool.query(`
  SELECT email FROM users
  WHERE email = $1;
  `, [email])
    .then(res => res.rows[0])
    .catch(err => console.error('Error executing query',err.stack));
};

module.exports = {
  getAllThings,
  getArchivedThings,
  addToWatch,
  addToRead,
  addToEat,
  addToBuy,
  addToMisc,
  editBooks,
  editProducts,
  editMovies,
  editRestaurants,
  editMisc,
  deleteBooks,
  deleteProducts,
  deleteMovies,
  deleteRestaurants,
  deleteMisc,
  recatergorizeIntoMovies,
  recatergorizeIntoBooks,
  recatergorizeIntoProducts,
  recatergorizeIntoMisc,
  recatergorizeIntoRestaurants,
  markCompleteItem,
  newUserDB,
  PasswordEmail,
  markUnCompleteItem,
  getUser
};
