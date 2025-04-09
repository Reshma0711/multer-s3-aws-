const { S3Client } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const dotenv = require("dotenv");
dotenv.config();

// const s3 = new S3Client({
//   region: process.env.AWS_S3_BUCKET_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });
const s3 = new S3Client({
  region: process.env.AWS_S3_BUCKET_REGION,
});

const uploadToS3 = async (file) => {
  const key = `${Date.now()}-${file.originalname}`;

  const upload = new Upload({
    client: s3,
    params: {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      // ACL: "public-read",
    },
  });

  const result = await upload.done();

  return {
    key,
    url:
      result.Location ||
      `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_S3_BUCKET_REGION}.amazonaws.com/${key}`,
  };
};

const getData = async (command) => {
  const response = await s3.send(command);
  return response;
};

module.exports = { uploadToS3, getData };
