const request = require('request');
const { addToWatch, addToBuy, addToRead, addToEat } = require('../routes/resultQueries');
const $ = require('jquery');

const searchEngine = function(query) {
  request(`https://www.googleapis.com/customsearch/v1?key=AIzaSyBzO6xal-XoFGuj0u7p0ziAaIDPHlZlgPU&cx=002704402873488483019:4ujf79s3i2h&q=${query}`, (error, response, body) => {
    body = JSON.parse(body);
    if (body.items[0]['link'].includes("imdb")) {
      addToWatch(body);
      return body;
    }

    if (body.items[0]['link'].includes("amazon")) {
      addToBuy(body);
      console.log(body.items[0]);
    }

    if (body.items[0]['link'].includes("zomato")) {
      addToEat(body);
      return body;
    }

    if (body.items[0]['link'].includes("goodreads")) {
      addToRead(body);
      return body;
    }
  });
  return query;
};

module.exports = { searchEngine };
