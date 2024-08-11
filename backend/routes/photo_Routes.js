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

routes.post("/photo/:userid", imageUpload.single("imageUrl"), InsertPhoto);
routes.delete("/photo/:id", DeletePhoto);
routes.get("/photo", GetAllPhotos);
routes.get("/photo/:id", GetPhotoById);

module.exports = routes;
