// TODO NOT USED. REMOVE LATER.

// Import the ORM to create functions that will interact with the database.
// var orm = require("../config/orm.js");

var news = {
  all: function(cb) {
    // orm.all("news", function(res) {
    //   cb(res);
    // });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    // orm.create("news", cols, vals, function(res) {
    //   cb(res);
    // });
  },
  update: function(objColVals, condition, cb) {
    // orm.update("news", objColVals, condition, function(res) {
    //   cb(res);
    // });
  },
  delete: function(condition, cb) {
    // orm.delete("news", condition, function(res) {
    //   cb(res);
    // });
  }
  
};

// Export the database functions for the controller (newssController.js).
module.exports = news;
