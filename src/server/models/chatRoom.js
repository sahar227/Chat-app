const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("joi");

const chatRoomSchema = new Schema({
  roomName: { type: String, minlength: 3, maxlength: 20, required: true },
  participants: [{ type: Schema.ObjectId, ref: "users" }],
  createdAt: { type: Date, default: Date.now },
  lastMessage: { type: Schema.ObjectId, ref: "messages" },
});

const validationSchema = joi.object({
  roomName: joi.string().min(3).max(20).required(),
  participants: joi.array().items(joi.string()).required(),
});

const validate = (params) => {
  const validationResponse = validationSchema.validate(params);
  if (validationResponse.error)
    return validationSchema.validate(params).error.details[0].message;
  return null;
};

const ChatRoom = mongoose.model("chatrooms", chatRoomSchema);
module.exports = {
  ChatRoom,
  chatRoomSchema,
  validateChatRoom: validate,
};
