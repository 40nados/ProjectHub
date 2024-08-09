const express = require("express");
const routes = express.Router();

//Importando Controllers
const {
  InsertPhoto,
  DeletePhoto,
  GetAllPhotos,
  GetPhotoById,
} = require("../controllers/photo_controller");

//Importando Middlewares
const { imageUpload } = require("../middlewares/imageUpload");

routes.post("/photo", imageUpload.single("imageUrl"), InsertPhoto);
routes.delete("/photo", DeletePhoto);
routes.get("/photo", GetAllPhotos);
routes.get("/photo", GetPhotoById);

module.exports = routes;
