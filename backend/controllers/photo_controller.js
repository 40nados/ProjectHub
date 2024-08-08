//InsertPhoto
//Delete_photo

//GetAllPhotos
//GetphotobyId

//Imports
const Photo = require("../models/photo");
const User = require("../models/user");
const mongoose = require("mongoose");

//Insert Photo
const InsertPhoto = async (req, res) => {
  const { title } = req.body;

  const imageUrl = req.file.location; //Location no S3

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  const newPhoto = await Photo.create({
    title,
    userId: user._id,
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

  const reqUser = req.user;

  try {
    const photo = await Photo.findById(id);

    //Photo dosn't exist - Foto Não existe
    if (!photo) {
      res.status(404).json({ errors: "Photo not found" });
      return;
    }

    //Photo belongs to user - Foto pertence ao usuário
    if (!photo.userId.equals(reqUser._id)) {
      res.status(403).json({ errors: "You can't delete this photo" });
    }

    //Deleting photo by DB - Deletando foto do banco
    await Photo.findByIdAndDelete(photo._id);

    res
      .status(200)
      .json({ id: photo.id, message: "Photo deleted succesfully!" }); // Success Message - Mensagem de Sucesso
  } catch (error) {
    res.status(500).json({ errors: "Intern Server Error" });
    return;
  }
};

//GetAllPhotos
const GetAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos); //Exibindo todas as fotos
};

//GetPhotoById
const GetPhotoById = async (req, res) => {
  const { id } = req.params;

  try {
    const photo = Photo.findById(id);

    if (!photo) {
      res.status(404).json({ errors: "Photo not found" }); // Foto não encontrada
      return;
    }

    res.status(200).json(photo);
  } catch (error) {
    res.status(500).json({ errors: "Intern Server Error" }); // Algum erro aí
    return;
  }
};

module.exports = {
  InsertPhoto,
  DeletePhoto,
  GetAllPhotos,
  GetPhotoById,
}; //Exportando las funciones
