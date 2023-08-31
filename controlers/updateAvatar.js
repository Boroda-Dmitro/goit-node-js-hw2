const { ctrlWrapper } = require("../helpers");
// const path = require("path");
// const fs = require("fs/promises");
const { User } = require("../models");
// const { resizeAvatar } = require("../helpers");



// const avatarDir = path.join(__dirname, "../", "public", "avatars");

// const updateAvatar = async (req, res) => {
//   const { _id } = req.user;
//   const { path: tempUpload, originalname } = req.file;
//   const filename = `${_id}_${originalname}`;
//   const resultUpload = path.join(avatarDir, filename);

//   await fs.rename(tempUpload, resultUpload);

//   await resizeAvatar(resultUpload, 250, 250);

//   const avatarURL = path.join("avatars", filename);
 
//   await User.findByIdAndUpdate(_id, { avatarURL });

//   res.json({
//     avatarURL,
//   });
// };

const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const { _id } = req.user;
    const avatarURL = req.file.path;

    const user = await User.findByIdAndUpdate(
      _id,
      {
        avatarURL,
      },
      { new: true }
    );

    return res.json({
      avatarURL: user.avatarURL,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = ctrlWrapper(updateAvatar);
