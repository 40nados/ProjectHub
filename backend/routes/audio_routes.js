const express = require("express");
const routes = express.Router();

//Importando Controllers
/*const {} = require("");*/

//Importando Middlewares
const { audioUpload } = require("../middlewares/audioUpload");

routes.post("/", audioUpload.single("imageUrl"), InsertAudio);
routes.delete("/:id", DeleteAudio);
routes.get("/:id", GetAllAudios);
routes.get("/:id", GetAudioById);

module.exports = routes;
