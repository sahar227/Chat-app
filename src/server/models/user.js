const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {chatRoomSchema} = require('./chatRoom');
 
const userSchema = new Schema({
  name: {
      first: String,
      last: String
  },
  email: String,
  googleId: String,
  chats: [chatRoomSchema]
});

const User = mongoose.model('users', userSchema);
module.exports = {
  User,
  userSchema
};