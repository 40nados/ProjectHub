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
  //To-do
};

module.exports = InsertPhoto;
