const express = require("express");
const routes = express.Router();

//Importando Controllers
const {
  InsertAudio,
  DeleteAudio,
  GetAllAudios,
  GetAudioById,
} = require("../controllers/audio_controller");

//Importando Middlewares
const { audioUpload } = require("../middlewares/audioUpload");

routes.post("/", audioUpload.single("audioUrl"), InsertAudio);
routes.delete("/:id", DeleteAudio);
routes.get("/:id", GetAllAudios);
routes.get("/:id", GetAudioById);

module.exports = routes;
