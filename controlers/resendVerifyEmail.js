const { HttpError, ctrlWrapper, sendMail } = require("../helpers");
const { User } = require("../models");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  const verifyEmail = {
    to: email,
    subject: "verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Clik to verify your email</a>`,
  };

  await sendMail(verifyEmail);

  res.status(200).json({ message: "Verification email sent" });
};

module.exports = ctrlWrapper(resendVerifyEmail);
