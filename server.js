// Parses our HTML and helps us find elements
const cheerio = require("cheerio");
// Makes HTTP request for HTML page
const axios = require("axios");
const mongoose = require("mongoose");
const express = require("express");


// =============================== MONGOOSE ================================================
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
console.log("Connected to : " + MONGODB_URI);
mongoose.connect(MONGODB_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Connected to mongoose database: " + MONGODB_URI);
});
// Mongoose Schema
var News = require('./db/news.js');
// =============================== END MONGOOSE ================================================


// =============================== EXPRESS + Handlebars ================================================
var PORT = process.env.PORT || 8080;
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/newsController.js");

app.use(routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
// =============================== END EXPRESS + Handlebars ================================================

// // First, tell the console what server.js is doing
// console.log("\n***********************************\n" +
//             "Grabbing every thread name and link\n" +
//             "from reddit's webdev board:" +
//             "\n***********************************\n");

// // Making a request via axios for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
// axios.get("https://old.reddit.com/r/webdev/").then((response) => {

//   // Load the HTML into cheerio and save it to a variable
//   // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
//   const $ = cheerio.load(response.data);

//   // An empty array to save the data that we'll scrape
//   const results = [];

//   // With cheerio, find each p-tag with the "title" class
//   // (i: iterator. element: the current element)
//   $("p.title").each(function(i, element) {

//     // Save the text of the element in a "title" variable
//     const title = $(element).text();

//     // In the currently selected element, look at its child elements (i.e., its a-tags),
//     // then save the values for any "href" attributes that the child elements may have
//     const link = $(element).children().attr("href");

//     // Save these results in an object that we'll push into the results array we defined earlier
//     results.push({
//       title: title,
//       link: link
//     });
//   });

//   // Log the results once you've looped through each of the elements found with cheerio
//   console.log(results);
// });
