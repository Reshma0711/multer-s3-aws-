const express = require("express");
const router = express.Router();
const uploadController = require("../controller/upload");
const upload = require("../middleware/multer");

router.post("/upload", upload.array("files", 10), uploadController.uploadFiles);

// router.get("/",uploadController.getImg);

router.get("/:key", uploadController.getImg);

router.get("/download/:key",uploadController.downloadImg)

module.exports = router;