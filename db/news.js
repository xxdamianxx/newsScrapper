const mongoose = require("mongoose");

var newsSchema = mongoose.Schema({
    headline: String,
    summary: String,
    url: String,
    comments: []
});

var News = mongoose.model('News', newsSchema);

module.exports = News; 