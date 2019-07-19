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
    // const results = [];

    $(".story-text").each(function(i, element) {
      let title = $(element).find("h3.title").text();
      // let link = $(element).find("a").attr("href");
      let link = $(element).children("a").attr("href");
      let synopsis = $(element).find("a").find("p.teaser").text();

      if(title != undefined && link != undefined && synopsis != undefined && synopsis != ""){

        News.findOne({headline: title}, function(err, newsArticle) {
          if (err) {
              console.log("MongoDB Error: " + err);
              return false; 
          }else if (!newsArticle || newsArticle == undefined){
            let newNews = News({headline: title, url:link, summary: synopsis});
            newNews.save(function(err, news_item) {
          if (err) {
            console.log("Error saving news article")
            throw err;
          }
        });
          }
        });
      }
    });
    console.log("Done crawling the news");
  });  
    // Load index page now...
    res.render("index", hbsObject);
});


router.get("/api/news", function(req, res) {
  News.find({}, function(err, all_news) {
    console.log("Sending back results...");
    console.log(" ");
    res.send(all_news);
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
  var news_id = req.params.id;
  console.log("id: " + news_id);
  // console.log("type of: " + typeof req);
  console.log("req.body.comment: " + req.body.comment); 
  // console.log("req.data stringify: " + JSON.stringify(req.data)); 
  // console.log("req parse: " + JSON.parse(req));
  // console.log("req stringify: " + JSON.stringify(req));
  
  var news_comment = req.body.comment;
  console.log("Adding Comment to ", news_id);
  console.log("news_comment: ", news_comment);

  News.findById(news_id, function(err, news) {
    if (err)
      throw(err)
    else {
      
      comments = news.comments;
      comments.push(news_comment);
      news.comments = comments;
  
      news.save(function(err) {
        if (err)
          console.log('Comment added unsuccessfully')
        else
          console.log('Comment added successfully')
        res.send({message: "Done with comment"})
      });
    }
  });
});

router.delete("/api/news/:id", function(req, res) {
  var news_id = req.params.id;
  var news_comment_req = req.body.comment;
  console.log("id: " + news_id);

  News.findById(news_id, function(err, news) {
    if (err)
      throw(err)
    else {
      
      comments = news.comments;
      for(var i = 0; i < comments.length; i++){
        if(comments[i] == news_comment_req){
          // remove comment here
          // update comments
          console.log("Found a comment to remove at " + i);
          comments.splice(i,1);
        }
        news.comments = comments;
      }
        
  
      news.save(function(err) {
        if (err)
          console.log('Comment removed unsuccessfully')
        else
          console.log('Comment removed successfully')
        res.send({message: "Done with comment"})
      });
    }
  });


});

// Export routes for server.js to use.
module.exports = router;
