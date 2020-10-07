const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("joi");

const chatRoomSchema = new Schema({
  roomName: { type: String, required: true },
  participants: [{ type: Schema.ObjectId, ref: "users" }],
  createdAt: { type: Date, default: Date.now },
  lastMessage: { type: Schema.ObjectId, ref: "messages" },
});

const validationSchema = joi.object({
  roomName: joi.string().required(),
  participants: joi.array().items(joi.string()).required(),
});

const validate = (params) => {
  return validationSchema.validate(params).error;
};

const ChatRoom = mongoose.model("chatrooms", chatRoomSchema);
module.exports = {
  ChatRoom,
  chatRoomSchema,
  validateChatRoom: validate,
};
