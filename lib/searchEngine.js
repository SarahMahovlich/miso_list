const request = require('request');
const { addToWatch } = require('../routes/resultQueries');

const searchEngine = function(query) {
  request(`https://www.googleapis.com/customsearch/v1?key=AIzaSyBzO6xal-XoFGuj0u7p0ziAaIDPHlZlgPU&cx=002704402873488483019:4ujf79s3i2h&q=${query}`, (error, response, body) => {
    body = JSON.parse(body);

    addToWatch(body);


  });
};




module.exports = { searchEngine };
