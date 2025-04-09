const { GetObjectCommand } = require("@aws-sdk/client-s3");
const File = require("../model/upload");
const { uploadToS3, getData } = require("../utils/upload");
const dotenv = require("dotenv").config();

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

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
      uploadResults,
    });
  } catch (error) {
    res.status(500).json({
      message: "Upload succeeded but DB save failed",
      error: error.message,
    });
  }
};

// exports.getImg = async (req, res) => {
//   try {
//     const files = await File.find().sort({ uploadedAt: -1 });
//     res.json(files);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch files" });
//   }
// };

exports.getImg = async (req, res) => {
  try {
    const { key } = req.params;
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    console.log("Requested key:", key);
  
    const data = await getData(command);

    // Set headers for file download
    res.setHeader(
      "Content-Type",
      data.ContentType || "application/octet-stream"
    );
    res.setHeader("Content-Disposition", `inline; filename="${key}"`);

    // Pipe the file stream to the response
    data.Body.pipe(res).on("error", (err) => {
      console.error("Stream error:", err);
      res.status(500).json({ message: "Error streaming file" });
    });
  } catch (err) {
    console.error("Fetch error:", err.message);
    res.status(500).json({ message: err.message });
  }
};


exports.downloadImg = async (req, res) => {
  try {
    const { key } = req.params;
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    console.log("Requested key:", key);
  
    const data = await getData(command);

    // Set headers for file download
    res.setHeader(
      "Content-Type",
      data.ContentType || "application/octet-stream"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${key}"`);

    // Pipe the file stream to the response
    data.Body.pipe(res).on("error", (err) => {
      console.error("Stream error:", err);
      res.status(500).json({ message: "Error streaming file" });
    });
  } catch (err) {
    console.error("Fetch error:", err.message);
    res.status(500).json({ message: err.message });
  }
};