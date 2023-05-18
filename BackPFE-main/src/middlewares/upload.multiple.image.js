const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = req.originalUrl.split("/")[2];
    cb(null, "uploads/" + path + "/");
  },
  filename: function (req, file, cb) {
    const lastIndex = file.originalname.lastIndexOf(".");
    cb(
      null,
      file.originalname.slice(0, lastIndex) +
        "-" +
        Date.now() +
        file.originalname.slice(lastIndex)
    );
  },
});

const uploadMultiple = multer({ storage: storage }).array("images", 5); // allow upload max 5 files

const uploadMultipleImages = (req, res) => {
  return req.files;
};

module.exports = { uploadMultiple, uploadMultipleImages };
