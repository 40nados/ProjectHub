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

routes.post("/audio/:userid", audioUpload.single("audioUrl"), InsertAudio);
routes.delete("/audio/:id", DeleteAudio);
routes.get("/audio", GetAllAudios);
routes.get("/audio/:id", GetAudioById);

module.exports = routes;
