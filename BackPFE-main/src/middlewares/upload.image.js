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

const upload = multer({ storage: storage }); // allow upload max 5 files

const uploadImages = (req, res) => {
  if (req.file == null) {
    return res.status(500).json({ error: "Please select one image to upload" });
  }
  return req.file;
};

module.exports = { upload, uploadImages };
