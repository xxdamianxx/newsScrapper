const mongoose = require("mongoose");

var newsSchema = mongoose.Schema({
    headline: String,
    summary: String,
    url: String
});

var News = mongoose.model('News', newsSchema);

module.exports = News; 