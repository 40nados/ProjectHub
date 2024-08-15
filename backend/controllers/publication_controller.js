//Imports
require("dotenv").config();
const Publication = require("../models/publication");
const User = require("../models/user");
const mongoose = require("mongoose");
const { s3Client } = require("../awsS3Client"); //Importando Configuração de login AWS
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");

//Insert Photo
const InsertPublication = async (req, res) => {
  const { title } = req.body;

  const imageUrl = req.file.location; //Location no S3

  const reqUser = req.params.userid;

  const user = await User.findById(reqUser);

  const newPublication = await Publication.create({
    title,
    userId: user.id,
    userName: user.username,
    url: imageUrl,
  });

  if (!newPublication) {
    res.status(422).json({ errors: "Error. Try later." });

    return;
  }

  res.status(201).json(newPublication);
};

//DeletePublication
const DeletePublication = async (req, res) => {
  const { id } = req.params;

  //const reqPhotoId = req.params.id;

  const reqUser = req.body.userId;
  try {
    const publication = await Publication.findById(id);

    //Publication dosn't exist - Foto Não existe
    if (!publication) {
      res.status(404).json({ errors: "Publication not found" });
      return;
    }

    //Publication belongs to user - Publicação pertence ao usuário
    if (publication.userId != reqUser) {
      res.status(422).json({ errors: "You can't delete this publication" });
      return;
    }

    const key = publication.url.split(".com/")[1];

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
      console.log(error);
      return res.status(500).json({ errors: "Error deleting file from S3." });
    }

    //Deleting publication by DB - Deletando foto do banco
    await Publication.findByIdAndDelete(publication._id);

    res.status(200).json({
      id: publication._id,
      message: "Publication deleted succesfully!",
    }); // Success Message - Mensagem de Sucesso
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Intern Server Error" });
    return;
  }
};

//GetAllPublications
const GetAllPublications = async (req, res) => {
  const publications = await Publication.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(publications); //All  Publications - Exibindo todas as publicações
};

//GetPublicationById
const GetPublicationById = async (req, res) => {
  const { id } = req.params;

  try {
    const publication = await Publication.findById(id);

    if (!publication) {
      res.status(404).json({ errors: "Publication not found" }); // Publication Not Found - Publicação não encontrada
      return;
    }

    res.status(200).json(publication);
  } catch (error) {
    res.status(500).json({ errors: "Intern Server Error" }); // Something Error - Algum erro aí
    return;
  }
};

//UpdatePublication
const UpdatePublication = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const reqUser = req.body.userId;

  const publication = await Publication.findById(id);

  //Check if publication exists -- Chencado se publicação existe
  if (!publication) {
    res.status(404).json({ errors: "Publication not found" }); // Publication Not Found -- Publicação não encontrada
    return;
  }

  //Publication belongs to user - Publicação pertence ao usuário
  if (publication.userId != reqUser) {
    res.status(422).json({ errors: "You can't edit this publication" });
    return;
  }

  if (title) {
    publication.title = title;
  }

  await publication.save();

  res
    .status(200)
    .json({ publication, message: "Publicação editada com sucesso!" });
};

//Likes
const Likes = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.body.userId;

  const publication = await Publication.findById(id);

  //Check if publication exists -- Chencado se publicação existe
  if (!publication) {
    res.status(404).json({ errors: "Publication not found" }); // Publication Not Found -- Publicação não encontrada
    return;
  }

  //Check if user already liked the photo - Publicação Já curtida ou não
  if (publication.likes.includes(reqUser)) {
    res.status(422).json({ errors: "You alredy liked this publication" }); // You alredy liked this publication -- Você já curtiu essa publicação
    return;
  }

  publication.likes.push(reqUser);

  publication.save();

  res
    .status(200)
    .json({ publication: id, userId: reqUser, message: "Publicação curtida!" });
};

//Comments

//Search
const SearchPublications = async (req, res) => {
  const { q } = req.query;

  const publications = await Publication.find({
    title: new RegExp(q, "i"),
  }).exec();

  res.status(200).json(publications);
};

module.exports = {
  InsertPublication,
  GetAllPublications,
  GetPublicationById,
  DeletePublication,
  UpdatePublication,
  SearchPublications,
  Likes,
}; //Exportando las funciones
