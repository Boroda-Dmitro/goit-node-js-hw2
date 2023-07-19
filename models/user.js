const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const validSubscriptions = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegex,
      unique: true,
    },
    subscription: {
      type: String,
      enum: validSubscriptions,
      default: "starter",
    },
    token: String,
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
      default: null,
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required(),
  subscription: Joi.string().valid(...validSubscriptions),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
});

const schemasUser = {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
};

module.exports = { schemasUser, User };
