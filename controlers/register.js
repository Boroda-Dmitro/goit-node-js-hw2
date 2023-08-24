const bcrypt = require("bcrypt");
const { User } = require("../models");
const gravatar = require("gravatar");
const { HttpError, ctrlWrapper, sendMail } = require("../helpers");
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");

const {BASE_URL, SECRET_KEY} = process.env

const resisterUser = async (req, res) => {
  const { email, password, name } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = await gravatar.url(email);
  const verificationToken = nanoid();

 await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  user = await User.findOne({ email });

  const verifyEmail = {
    to: email,
    subject: "verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Clik to verify your email</a>`,
  };

  await sendMail(verifyEmail)

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(201).json({
    token,
    user: { name, email: user.email, subscription: user.subscription, avatarURL, },
  });

};

module.exports = ctrlWrapper(resisterUser);
