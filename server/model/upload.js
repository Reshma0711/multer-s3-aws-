const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  key: {
    type: String,
    required: [true, "S3 key is required"], // e.g., 'uploads/myimage.jpg'
  },
  url: {
    type: String,
    required: [true, "S3 URL is required"], // e.g., 'https://bucket-name.s3.amazonaws.com/uploads/myimage.jpg'
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('File', FileSchema);
