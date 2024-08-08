const express = require("express");
const routes = express.Router();

//Importando Controllers

//Importando Middlewares
const { imageUpload } = require("../middlewares/imageUpload");

routes.post("/", imageUpload.single("imageUrl"));

module.exports = routes;
