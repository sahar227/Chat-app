const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const chatRoomSchema = new Schema({
  roomName: { type: String, required: true},
  createdAt: { type: Date, default: Date.now },
  lastMessage: {type: Schema.ObjectId, ref: 'messages'}
});

const ChatRoom = mongoose.model('chatrooms', chatRoomSchema);
module.exports = {
  ChatRoom,
  chatRoomSchema
};