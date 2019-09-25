const request = require('request');
const { addToWatch, addToBuy, addToRead, addToEat, addToMisc } = require('../routes/resultQueries');
// const { Pool } = require('pg');
// const dbParams = require('../lib/db.js');
// const db = new Pool(dbParams);

const searchEngine = function(query, cb) {
  request(`https://www.googleapis.com/customsearch/v1?key=AIzaSyBzO6xal-XoFGuj0u7p0ziAaIDPHlZlgPU&cx=002704402873488483019:4ujf79s3i2h&q=${query}`, (error, response, body) => {
    body = JSON.parse(body);
    if (body.items) {

      if (body.items[0]['link'].includes("imdb")) {
        addToWatch(body, query);
        cb(true);
      }

      if (body.items[0]['link'].includes("amazon")) {
        addToBuy(body, query);
        cb(true);

      }

      if (body.items[0]['link'].includes("zomato") && body.items[0]['displayLink'.includes("zomato")]) {
        addToEat(body, query);
        cb(true);
      }

      if (body.items[0]['link'].includes("goodreads")) {
        addToRead(body, query);
        cb(true);
      }
    } else {
      addToMisc(query);
      cb(true);
    }

  });
  return searchEngine;
};


module.exports = { searchEngine };

