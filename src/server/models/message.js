const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);

const messageSchema = new Schema({
  content: { type: String, minlength: 1, maxlength: 255, required: true },
  author: { type: Schema.ObjectId, ref: "users", required: true },
  chatRoom: { type: Schema.ObjectId, ref: "chatRooms", required: true },
  createdAt: { type: Date, default: Date.now },
});

const validationSchema = joi.object({
  content: joi.string().min(1).max(255).required(),
  chatroom: joi.objectId().required(),
});

const validate = (params) => {
  const validationResponse = validationSchema.validate(params);
  if (validationResponse.error)
    return validationSchema.validate(params).error.details[0].message;
  return null;
};

const Message = mongoose.model("messages", messageSchema);
module.exports = {
  Message,
  messageSchema,
  validateMessage: validate,
};
