const express = require("express");
const routes = express.Router();

//Controllers
const {
  insertPublication,
  GetAllPublications,
} = require("../controllers/publication_controller");

//Middlewares
const { imageUpload } = require("../middlewares/imageUpload");

routes.post(
  "/publication/:userid",
  imageUpload.single("imageUrl"),
  insertPublication
);
routes.delete("/publication/:id");
routes.get("/publication", GetAllPublications);
routes.get("/publication/:id");

module.exports = routes;
