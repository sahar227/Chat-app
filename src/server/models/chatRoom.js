const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const ChatRoom = new Schema({
  participants: [mongoose.Types.ObjectId],
  roomName: String,
  createdAt: { type: Date, default: Date.now }
});

const model = mongoose.model('chatRooms', ChatRoom);
module.exports = model;