const multer = require("multer");

const storage = multer.memoryStorage(); // store file in memory
const upload = multer({ storage: storage });

module.exports = upload;
