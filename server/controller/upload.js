const File = require('../model/upload');
const uploadToS3 = require('../utils/upload');

exports.uploadFiles = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadResults = await Promise.all(
      files.map(async (file) => {
        const { key, url } = await uploadToS3(file);
        return { key, url };
      })
    );

    const savedFiles = await File.insertMany(uploadResults);

    res.status(200).json({
      message: "Files uploaded and saved successfully",
      data: savedFiles,
    });
  } catch (error) {
    res.status(500).json({
      message: "Upload succeeded but DB save failed",
      error: error.message,
    });
  }
};
