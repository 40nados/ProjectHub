//Imports
require("dotenv").config();
const Photo = require("../models/photo");
const User = require("../models/user");
const mongoose = require("mongoose");
const { s3Client } = require("../awsS3Client"); //Importando Configuração de login AWS
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");

//Insert Photo
const InsertPhoto = async (req, res) => {
  const { title } = req.body;

  const imageUrl = req.file.location; //Location no S3

  const reqUser = req.params.userid;

  const user = await User.findById(reqUser);

  const newPhoto = await Photo.create({
    title,
    userId: user.id,
    userName: user.username,
    url: imageUrl,
  });

  if (!newPhoto) {
    res.status(422).json({ errors: "Error. Try later." });

    return;
  }

  res.status(201).json(newPhoto);
};

//DeletePhoto
const DeletePhoto = async (req, res) => {
  const { id } = req.params;

  //const reqPhotoId = req.params.id;

  const reqUser = req.body.userId;
  try {
    const photo = await Photo.findById(id);

    //Photo dosn't exist - Foto Não existe
    if (!photo) {
      res.status(404).json({ errors: "Photo not found" });
      return;
    }

    //Photo belongs to user - Foto pertence ao usuário
    if (photo.userId != reqUser) {
      res.status(422).json({ errors: "You can't delete this photo" });
      return;
    }

    const key = photo.url.split(".com/")[1];

    const url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`; //Pegando url da imagem para deletar no bucket, e garantindo que ela esta no formato correto

    const deleteParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    };

    try {
      await s3Client.send(new DeleteObjectCommand(deleteParams));
      //console.log(`Deletado do s3, link: ${url}`);
    } catch (error) {
      //console.log(`Erro ao deletar do s3, link: ${url}`);
      //console.log(error);
      return res.status(500).json({ errors: "Error deleting file from S3." });
    }

    //Deleting photo by DB - Deletando foto do banco
    await Photo.findByIdAndDelete(photo._id);

    res
      .status(200)
      .json({ id: photo._id, message: "Photo deleted succesfully!" }); // Success Message - Mensagem de Sucesso
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Intern Server Error" });
    return;
  }
};

//GetAllPhotos
const GetAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos); //All  Photos - Exibindo todas as fotos
};

//GetPhotoById
const GetPhotoById = async (req, res) => {
  const { id } = req.params;

  try {
    const photo = await Photo.findById(id);

    if (!photo) {
      res.status(404).json({ errors: "Photo not found" }); // Photo Not Found - Foto não encontrada
      return;
    }

    res.status(200).json(photo);
  } catch (error) {
    res.status(500).json({ errors: "Intern Server Error" }); // Something Error - Algum erro aí
    return;
  }
};

module.exports = {
  InsertPhoto,
  DeletePhoto,
  GetAllPhotos,
  GetPhotoById,
}; //Exportando las funciones
