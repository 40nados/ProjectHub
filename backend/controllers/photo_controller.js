//InsertPhoto
//Delete_photo
//GettAllPhotos
//GetphotobyId
//GetuserPhotos

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
    res.status(422).json({ errors: "Error. Try another photo." });

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

    if (!photo) {
      res.status(404).json({ errors: "Photo not found" });
      return;
    }
    if (!photo.userId.equals(reqUser._id)) {
      res.status(403).json({ errors: "You can't delete this photo" });
    }

    await Photo.findByIdAndDelete(photo._id);

    res
      .status(200)
      .json({ id: photo.id, message: "Foto apagada com sucesso!" });
  } catch (error) {
    res.status(500).json({ errors: "Erro interno no servidor" });
    return;
  }
};

module.exports = { InsertPhoto, DeletePhoto }; //Exportando las funciones
