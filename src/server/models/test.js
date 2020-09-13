const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const BlogPost = new Schema({
  author: String,
  title: String,
  body: String,
  date: Date
});

const model = mongoose.model('test', BlogPost);
module.exports = model;