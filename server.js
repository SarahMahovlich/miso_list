// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
const { searchEngine } = require('./lib/searchEngine');
const resultQueries = require('./routes/resultQueries.js');
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

//RENDERING ROOT PAGE
app.get("/", (req, res) => {
  resultQueries.getAllThings()
    .then((result) => {
      const templatevars = {results: result};
      resultQueries.getArchivedThings()
        .then((archive) => {
          templatevars.archives = archive;
          res.render("index", templatevars);
        });
    });
});

//POSTING INFORMATION FROM FORM
app.post("/", (req, res) => {
  const string = req.body.searchEngine;
  // const templatevars = {results: searchEngine(string)};
  //find the category using a helper function googlesearch API
  searchEngine(string, (success)=>{
    if (success) {
      resultQueries.getAllThings()
        .then((result) => {
          res.redirect('/');
        });
    }
  });
});

//RENDERING REGISTRATION PAGE
app.get("/register", (req, res) => {
  res.render("register");
});

//POSTING INFORMATION FROM REGISTRATION PAGE
app.post("/register", (req, res) => {
  res.redirect("/");
});

//RENDERING LOGIN PAGE
app.get("/login", (req, res) => {
  res.render("login");
});

//MARKING THE ITEM AS COMPLETED
app.post("/:table/:id/complete", (req, res) => {
<<<<<<< HEAD
  const status = req.route.methods.post;
=======
const itemTable = res.req.params.table;
const itemId = res.req.params.id;
const status = req.route.methods.post;
>>>>>>> 34162435611da8e09062323e4b3afd5f70ffdcbe
  if (status === true) {
    resultQueries.markCompleteItem(itemTable, itemId)
    .then((result) => {
      res.redirect('/');
    });
  }
});

//RENDERING SELECTED ITEM PAGE
app.get("/:list_item", (req, res) => {
  // eslint-disable-next-line camelcase
  const templateVars = { list_item: req.params.list_item};
  res.render("showItem", templateVars);
});

//EDITING THE URL
app.post("/:list_item", (req, res) => {
  let listItem = req.headers.referer;
  listItem = listItem.replace('http://localhost:8080/', '');
  listItem = decodeURI(listItem);
  const string = req.body.nameEdit;
  resultQueries.editBooks(string, listItem);
  resultQueries.editProducts(string, listItem);
  resultQueries.editMovies(string, listItem);
  resultQueries.editRestaurants(string, listItem);
  resultQueries.editMisc(string, listItem);
  res.redirect('/');
});

//DELETING THE URL
app.post("/:list_item/delete", (req, res) => {
  let listItem = req.headers.referer;
  listItem = listItem.replace('http://localhost:8080/', '');
  listItem = listItem.replace('/delete', '');
  listItem = decodeURI(listItem);

  resultQueries.deleteBooks(listItem);
  resultQueries.deleteProducts(listItem);
  resultQueries.deleteMovies(listItem);
  resultQueries.deleteRestaurants(listItem);
  resultQueries.deleteMisc(listItem);
  res.redirect('/');
});

// UPDATING THE URL
app.post("/:list_item/update", (req, res) => {
  let listItem = req.headers.referer;
  listItem = listItem.replace('http://localhost:8080/', '');
  listItem = decodeURI(listItem);
  if (req.body.Category) {
    resultQueries.deleteBooks(listItem);
    resultQueries.deleteProducts(listItem);
    resultQueries.deleteMovies(listItem);
    resultQueries.deleteRestaurants(listItem);
    resultQueries.deleteMisc(listItem);
  }

  if (req.body.Category === 'Books') {
    resultQueries.recatergorizeIntoBooks(listItem, req.body.contextEdit);
  }
  if (req.body.Category === 'Products') {
    resultQueries.recatergorizeIntoProducts(listItem, req.body.contextEdit);
  }
  if (req.body.Category === 'Movies and series') {
    resultQueries.recatergorizeIntoMovies(listItem, req.body.contextEdit);
  }
  if (req.body.Category === 'Restaurants') {
    resultQueries.recatergorizeIntoRestaurants(listItem, req.body.contextEdit);
  }
  if (req.body.Category === 'Misc') {
    resultQueries.recatergorizeIntoMisc(listItem, req.body.contextEdit);
  }
  res.redirect('/');

});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
