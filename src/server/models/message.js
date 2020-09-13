const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const ChatRoom = new Schema({
  content: String,
  author: mongoose.Types.ObjectId,
  chatRoom: mongoose.Types.ObjectId,
  createdAt: { type: Date, default: Date.now }
});

const model = mongoose.model('chatRooms', ChatRoom);
module.exports = model;