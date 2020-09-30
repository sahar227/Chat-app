const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const messageSchema = new Schema({
  content: String,
  author: mongoose.Types.ObjectId,
  chatRoom: mongoose.Types.ObjectId,
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('messages', messageSchema);
module.exports = {
  Message,
  messageSchema
};