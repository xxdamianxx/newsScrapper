
console.log("seed running...");
console.log(" ");
console.log(" ");

const mongoose = require('mongoose');

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
console.log("Connected to : " + MONGODB_URI);
mongoose.connect(MONGODB_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Connected to mongoose database: " + MONGODB_URI);
});

let News = require('./news.js');

// headline: String,
// summary: String,
// url: String

// create a new user
let newNews = News({
  headline: 'News Alert',
  summary: 'blah blah foo bar blah blah foo bar ',
  url: 'http://cnn.com'
});

// save the news
console.log(" ");
console.log(" ");
console.log("newNews: " + newNews);
newNews.save(function(err) {
  if (err) {
    console.log("Error saving news article")
    throw err;
  }
  console.log(" ");
  console.log(" ");
  console.log('News created successfully.');
  News.find({}, function(err, news) {
    if (err) throw err;
    // object of all the users
    console.log(" ");
    console.log(" ");
    console.log("News");
    console.log(news);
  });
});


