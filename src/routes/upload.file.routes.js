const route = require("express").Router();
const multer = require("multer");

var fileName;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    fileName = new Date().toISOString().replace(/:/g, "-") + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

route.post("/upload-single-file", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No files uploaded.");
  }

  res.status(200).send({ fileName: fileName });
});

route.post("/upload-multi-file", upload.array("files", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }

  const fileNames = req.files.map((file) => file.filename);

  res.status(200).send({ fileNames: fileNames });
});

module.exports = route;
