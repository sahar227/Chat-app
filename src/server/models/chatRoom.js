const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {messageSchema} = require('./message');
 
const chatRoomSchema = new Schema({
  roomName: { type: String, required: true},
  createdAt: { type: Date, default: Date.now },
  lastMessage: messageSchema
});

const ChatRoom = mongoose.model('chatRooms', chatRoomSchema);
module.exports = {
  ChatRoom,
  chatRoomSchema
};