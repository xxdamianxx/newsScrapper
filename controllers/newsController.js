var express = require("express");
// Parses our HTML and helps us find elements
const cheerio = require("cheerio");
// Makes HTTP request for HTML page
const axios = require("axios");
// const database = require("./../db/database_connect.js");
let News = require('./../db/news.js');

var router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
//   cat.all(function(data) {
    
    var hbsObject = {
      message: "Success"
    };
    // console.log(hbsObject);


    



    res.render("index", hbsObject);
//   });
});


router.get("/api/news", function(req, res) {
  // First, tell the console what server.js is doing
  console.log("\n***********************************\n" +
              "Grabbing every thread name and link\n" +
              "from NPR:" +
              "\n***********************************\n");
  axios.get("https://www.npr.org/").then((response) => {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    const $ = cheerio.load(response.data);
  
    // An empty array to save the data that we'll scrape
    const results = [];

    $(".story-text").each(function(i, element) {
      let title = $(element).find("h3.title").text();
      // let link = $(element).find("a").attr("href");
      let link = $(element).children("a").attr("href");
      let synopsis = $(element).find("a").find("p.teaser").text();

      // Save the text of the element in a "title" variable
      // const title = $(element).text();
      // console.log(" =============================== News Element Start ===================");
      // console.log(" ");
      // console.log(" ");
      // // console.log("title: " + title);
      // console.log(" ");

      // console.log(" ");
      // console.log(" ");
      // // console.log("link: " + link);
      // console.log(" ");

      // console.log(" ");
      // console.log(" ");
      // // console.log("synopsis: " + synopsis);
      // console.log(" ");
      if(title != undefined && link != undefined && synopsis != undefined && synopsis != ""){
        let newNews = News({headline: title, url:link, summary: synopsis});
        newNews.save(function(err, news_item) {
          if (err) {
            console.log("Error saving news article")
            throw err;
          }
          // console.log(" ");
          // console.log(" ");
          // console.log('News added successfully.' + news_item._id);
        });
      }
    });
    News.find({}, function(err, all_news) {
      console.log("Sending back results...");
      console.log(" ");
      // console.log(all_news);
      // console.log(results);
      // console.log(" ");
      // console.log(" ");
      res.send(all_news);
    });
    

  });      
    
  });

router.post("/api/news", function(req, res) {
//   cat.create([
//     "name", "sleepy"
//   ], [
//     req.body.name, req.body.sleepy
//   ], function(result) {
//     // Send back the ID of the new quote
//     res.json({ id: result.insertId });
//   });
});

router.put("/api/news/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  console.log("condition", condition);

//   cat.update({
//     sleepy: req.body.sleepy
//   }, condition, function(result) {
//     if (result.changedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
});

router.delete("/api/news/:id", function(req, res) {
  var condition = "id = " + req.params.id;

//   cat.delete(condition, function(result) {
//     if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
});

// Export routes for server.js to use.
module.exports = router;
