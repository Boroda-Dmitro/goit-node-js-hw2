const listContacts = require("./listContacts");
const getById = require("./getById");
const addContact = require("./addContact");
const updateContact = require("./updateContact");
const removeContact = require("./removeContact");
const updateFavorite = require("./updateFavorite");
const register = require("./register");
const login = require("./login");
const getCurrentUser = require("./getCurrentUser");
const logout = require("./logout");
const updateUser = require("./updateUser");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
  listContacts,
  getById,
  addContact,
  updateContact,
  removeContact,
  updateFavorite,
  register,
  login,
  getCurrentUser,
  logout,
  updateUser,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};
