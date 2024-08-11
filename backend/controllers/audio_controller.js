//Imports
require("dotenv").config();
const Audio = require("../models/audio");
const User = require("../models/user");
const mongoose = require("mongoose");
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");

// Configuração da AWS
const s3Client = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
  sslEnabled: false,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

//Insert Audio
const InsertAudio = async (req, res) => {
  const { title } = req.body;

  const audioUrl = req.file.location; //Location no S3

  const reqUser = req.params.userid;

  const user = await User.findById(reqUser);

  const newAudio = await Audio.create({
    title,
    userId: user.id,
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

  const reqUser = req.body.userId;

  try {
    const audio = await Audio.findById(id);

    //Audio dosn't exist - Audio Não existe
    if (!audio) {
      res.status(404).json({ errors: "Audio not found" });
      return;
    }

    //Audio belongs to user - Audio pertence ao usuário
    if (audio.userId != reqUser) {
      res.status(403).json({ errors: "You can't delete this audio" });
    }

    const key = audio.url.split(".com/")[1];

    const url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`; //Pegando url do audio para deletar no bucket, e garantindo que ela esta no formato correto

    const deleteParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    };

    try {
      await s3Client.send(new DeleteObjectCommand(deleteParams));
      console.log(`Deletado do s3, link: ${url}`);
    } catch (error) {
      console.log(`Erro ao deletar do s3, link: ${url}`);
      console.log(error);
      return res.status(500).json({ errors: "Error deleting file from S3." });
    }

    //Deleting audio by DB - Deletando audio do banco
    await Audio.findByIdAndDelete(audio._id);

    res
      .status(200)
      .json({ id: audio._id, message: "Audio deleted succesfully!" }); // Success Message - Mensagem de Sucesso
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
    const audio = await Audio.findById(id);

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
