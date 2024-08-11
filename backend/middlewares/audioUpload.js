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
const audioStorage = multerS3({
  s3: s3Client,
  bucket: "projecthubs3",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: "public-read",
  key: function (req, file, cb) {
    let folder = "";

    if (req.baseUrl.includes("user")) {
      folder = "user_audios";
    } else if (req.baseUrl.includes("audio")) {
      folder = "audios";
    } else {
      folder = "audios";
    }

    const filename = Date.now() + path.extname(file.originalname);
    const key = `uploads/${folder}/${filename}`; // Cria a pasta audios no bucket --> uploads/user_audios e uploads/audios quando setado no BaseUrl
    cb(null, key);
  },
});

const audioUpload = multer({
  storage: audioStorage,
  fileFilter(req, file, cb) {
    if (
      !file.originalname.match(
        /\.(mp3|mp4|wav|webm|aac|flac|ogg|m4a|wma|aiff|alac|3gp|mov|opus)$/i
      )
    ) {
      // Upload apenas formatos permitidos
      return cb(new Error("Please, send a valid format."));
    }
    cb(undefined, true);
  },
});

module.exports = { audioUpload };
