const express = require("express");
const routes = express.Router();

//Controllers
const {
  InsertPublication,
  GetAllPublications,
  GetPublicationById,
  DeletePublication,
  UpdatePublication,
} = require("../controllers/publication_controller");

//Middlewares
const { imageUpload } = require("../middlewares/imageUpload");

routes.post(
  "/publication/:userid",
  imageUpload.single("imageUrl"),
  InsertPublication
);
routes.delete("/publication/:id", DeletePublication);
routes.get("/publication", GetAllPublications);
routes.get("/search");
routes.patch("/publication/:id", UpdatePublication);
routes.get("/publication/:id", GetPublicationById);

module.exports = routes;
