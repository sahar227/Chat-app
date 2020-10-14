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
  chats: [{ type: Schema.ObjectId, ref: "chatrooms" }],
});

const validationSchema = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
});

const validate = (params) => {
  const validationResponse = validationSchema.validate(params);
  if (validationResponse.error)
    return validationSchema.validate(params).error.details[0].message;
  return null;
};

const User = mongoose.model("users", userSchema);
module.exports = {
  User,
  userSchema,
  validate,
};
