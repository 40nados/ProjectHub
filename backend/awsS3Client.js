const { S3Client } = require("@aws-sdk/client-s3");

// Configuração da AWS
const s3Client = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
  sslEnabled: true,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

module.exports = { s3Client };
