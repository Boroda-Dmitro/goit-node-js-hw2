const bcrypt = require("bcrypt");
const { User } = require("../models");
const gravatar = require("gravatar");
const { HttpError, ctrlWrapper, sendMail } = require("../helpers");
const { nanoid } = require("nanoid");

const {BASE_URL} = process.env

const resisterUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = await gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Clik to verify your email</a>`,
  };

  await sendMail(verifyEmail)

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL,
  });
};

module.exports = ctrlWrapper(resisterUser);
