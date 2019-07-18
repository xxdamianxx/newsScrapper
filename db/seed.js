const database = require('./database_connect.js');
let News = require('./news.js');

console.log("seed running...");
console.log(" ");
console.log(" ");

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
// newNews.save(function(err) {
//   if (err) {
//     console.log("Error saving news article")
//     throw err;
//   }
//   console.log(" ");
//   console.log(" ");
//   console.log('News created successfully.');
  News.find({}, function(err, news) {
    if (err) throw err;
    // object of all the users
    console.log(" ");
    console.log(" ");
    console.log("News");
    console.log(news);
  });
// });

