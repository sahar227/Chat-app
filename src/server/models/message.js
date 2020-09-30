const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const messageSchema = new Schema({
  content: String,
  author: {type: Schema.ObjectId, ref: 'users'},
  chatRoom: {type: Schema.ObjectId, ref: 'chatRooms'},
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('messages', messageSchema);
module.exports = {
  Message,
  messageSchema
};