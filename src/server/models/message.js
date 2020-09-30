const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

const messageSchema = new Schema({
  content: {type: String, required: true},
  author: {type: Schema.ObjectId, ref: 'users', required: true},
  chatRoom: {type: Schema.ObjectId, ref: 'chatRooms', required: true},
  createdAt: { type: Date, default: Date.now }
});

const validationSchema = joi.object({
  content: joi.string().required(),
  chatroom: joi.objectId().required()
});

const validate = (params) => {
  return validationSchema.validate(params).error;
}

const Message = mongoose.model('messages', messageSchema);
module.exports = {
  Message,
  messageSchema,
  validateMessage: validate
};