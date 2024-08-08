require("dotenv").config();
const multer = require("multer");
const path = require("path");
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");

// Configuração da AWS
const s3Client = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
  sslEnabled: false,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

//Setando multerS3, bucketName e criação de pasta no bucket
const imageStorage = multerS3({
  s3: s3Client,
  bucket: "projecthubs3",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: "public-read",
  key: function (req, file, cb) {
    let folder = "";

    if (req.baseUrl.includes("user")) {
      folder = "user";
    } else if (req.baseUrl.includes("image")) {
      folder = "image";
    }

    const filename = Date.now() + path.extname(file.originalname);
    const key = `uploads/${folder}/${filename}`; // Cria a pasta uploads no bucket --> uploads/user e uploads/image quando setado no BaseUrl
    cb(null, key);
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/i)) {
      // Upload apenas formatos png, jpg e jpeg
      return cb(new Error("Por favor, envie apenas png, jpg, ou jpeg."));
    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload };