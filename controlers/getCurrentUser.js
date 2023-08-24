const { ctrlWrapper } = require("../helpers");

const getCurrentUser = async (req, res) => {
  const { name, email, subscription, avatarURL } = req.user;

  res.json({ name, email, subscription, avatarURL });
};

module.exports = ctrlWrapper(getCurrentUser);
