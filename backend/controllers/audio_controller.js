//Imports
const Audio = require("../models/audio");
const User = require("../models/user");
const mongoose = require("mongoose");

//Insert Audio
const InsertAudio = async (req, res) => {
  const { title } = req.body;

  const audioUrl = req.file.location; //Location no S3

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  const newAudio = await Audio.create({
    title,
    userId: user._id,
    userName: user.username,
    url: audioUrl,
  });

  if (!newAudio) {
    res.status(422).json({ errors: "Error. Try later." });

    return;
  }

  res.status(201).json(newAudio);
};

//DeleteAudio
const DeleteAudio = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  try {
    const audio = await Audio.findById(id);

    //Audio dosn't exist - Audio Não existe
    if (!audio) {
      res.status(404).json({ errors: "Audio not found" });
      return;
    }

    //Audio belongs to user - Audio pertence ao usuário
    if (!audio.userId.equals(reqUser._id)) {
      res.status(403).json({ errors: "You can't delete this audio" });
    }

    //Deleting audio by DB - Deletando audio do banco
    await Audio.findByIdAndDelete(audio._id);

    res
      .status(200)
      .json({ id: audio.id, message: "Audio deleted succesfully!" }); // Success Message - Mensagem de Sucesso
  } catch (error) {
    res.status(500).json({ errors: "Intern Server Error" });
    return;
  }
};

//GetAllAudios
const GetAllAudios = async (req, res) => {
  const audios = await Audio.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(audios); //Exibindo todas os audios
};

//GetAudioById
const GetAudioById = async (req, res) => {
  const { id } = req.params;

  try {
    const audio = Audio.findById(id);

    if (!audio) {
      res.status(404).json({ errors: "Audio not found" }); // Audio não encontrada
      return;
    }

    res.status(200).json(audio);
  } catch (error) {
    res.status(500).json({ errors: "Intern Server Error" }); // Algum erro aí
    return;
  }
};

module.exports = {
  InsertAudio,
  DeleteAudio,
  GetAllAudios,
  GetAudioById,
}; //Exportando las funciones
