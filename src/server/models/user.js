const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("joi");

const userSchema = new Schema({
  name: {
    first: String,
    last: String,
  },
  email: String,
  googleId: String,
  chats: [{ type: Schema.ObjectId, ref: "chatrooms", unique: true }],
});

const validationSchema = joi.object({
  email: joi.string().email({ tlds: { allow: false } }),
});

const validate = (params) => {
  return validationSchema.validate(params).error;
};

const User = mongoose.model("users", userSchema);
module.exports = {
  User,
  userSchema,
  validate,
};
