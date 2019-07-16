var express = require("express");
var router = express.Router();

// Import the model (cat.js) to use its database functions.
var news = require("../models/news.js");



//  * Headline - the title of the article
//  * Summary - a short summary of the article
//  * URL - the url to the original article
//  * [OPTIONAL] Feel free to add more content to your database (photos, bylines, and so on).


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
