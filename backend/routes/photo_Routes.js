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

routes.post("/", imageUpload.single("imageUrl"), InsertPhoto);
routes.delete("/:id", DeletePhoto);
routes.get("/:id", GetAllPhotos);
routes.get("/:id", GetPhotoById);

module.exports = routes;
