const router = require("express").Router();

const uploader = require("../middlewares/Cloudinary.js");

// POST "/api/upload"
router.post("/", uploader.single("image"), (req, res, next) => {


  if (!req.file) {
    next("No file uploaded!");
    return;
  }
  res.json({ imageUrl: req.file.path });
});



module.exports = router;