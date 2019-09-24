const request = require('request');
const { addToWatch, addToBuy, addToRead, addToEat } = require('../routes/resultQueries');
// const { Pool } = require('pg');
// const dbParams = require('../lib/db.js');
// const db = new Pool(dbParams);

const searchEngine = function(query, cb) {
  request(`https://www.googleapis.com/customsearch/v1?key=AIzaSyBzO6xal-XoFGuj0u7p0ziAaIDPHlZlgPU&cx=002704402873488483019:4ujf79s3i2h&q=${query}`, (error, response, body) => {
    body = JSON.parse(body);
    if (body.items[0]['link'].includes("imdb")) {
      addToWatch(body);
      cb(true);
    }

    if (body.items[0]['link'].includes("amazon")) {
      addToBuy(body);
      cb(true);

    }

    if (body.items[0]['link'].includes("zomato")) {
      addToEat(body);
      cb(true);
    }

    if (body.items[0]['link'].includes("goodreads")) {
      addToRead(body);
      cb(true);
    }
  });
  return searchEngine;
};


module.exports = { searchEngine };

