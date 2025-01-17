// const multer = require("multer");
// const path = require("path");

// const tmpDir = path.join(__dirname, "../", "tmp");

// const multerConfig = multer.diskStorage({
//   destination: tmpDir,
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   }
// });

// const upload = multer({
//   storage: multerConfig,
// });

// module.exports = upload;

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const { nanoid } = require("nanoid");

const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET_KEY,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "avatars",
    allowed_formats: ["jpg", "png"],
    public_id: (req, file) => `${nanoid()}_${file.originalname.replace(/\s/g, "_")}`
  },
});

const upload = multer({ storage });

module.exports = upload;
