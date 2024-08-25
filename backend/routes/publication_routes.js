const express = require("express");
const routes = express.Router();

//Middlewares
const authenticateJWT = require("../middlewares/auth");

//Controllers
const {
  InsertPublication,
  GetAllPublications,
  GetPublicationById,
  DeletePublication,
  GetUserPublications,
  UpdatePublication,
  SearchPublications,
  Likes,
  Comment,
} = require("../controllers/publication_controller");

//Middlewares
const { imageUpload } = require("../middlewares/imageUpload");
const {
  publicationInsertValidation,
  commentValidation,
  publicationUpdateValidation,
} = require("../middlewares/publicationValidation");
const checkEmailVerified = require("../middlewares/checkEmailVerified");
const validate = require("../middlewares/handleValidation");

routes.use(authenticateJWT);

routes.post(
  "/publication/:userid",
  checkEmailVerified,
  imageUpload.single("imageUrl"),
  publicationInsertValidation(),
  validate,
  InsertPublication
);

routes.delete("/publication/:id", DeletePublication);
routes.get("/publication", GetAllPublications);
routes.get("/publication/user/:id", GetUserPublications);
routes.get("/search", SearchPublications);
routes.put("/like/:id", Likes);
routes.put("/comment/:id", commentValidation(), validate, Comment);
routes.patch(
  "/publication/:id",
  imageUpload.single("imageUrl"),
  publicationUpdateValidation(),
  validate,
  UpdatePublication
);
routes.get("/publication/:id", GetPublicationById);

module.exports = routes;
