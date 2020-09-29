const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const User = new Schema({
  name: {
      first: String,
      last: String
  },
  email: String,
  googleId: String,
});

const model = mongoose.model('users', User);
module.exports = model;