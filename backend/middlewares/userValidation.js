const { body } = require("express-validator");

const createUserValidation = () => {
  return [
    body("username")
      .isString()
      .withMessage("O Username é obrigatório!")
      .isLength({ min: 3 })
      .withMessage("O Username precisa ter no mínimo 3 caracteres."),
    body("email")
      .isString()
      .withMessage("O Email é obrigatório!")
      .isEmail()
      .withMessage("O Email precisa ser válido!"),
    body("password")
      .isString()
      .withMessage("A senha é obrigatória!")
      .isLength({ min: 5 })
      .withMessage("A senha deve ter ao menos 5 caracteres."),
    body("language").notEmpty().withMessage("A linguagem é obrigatória!"),
  ];
};

const loginUserValidation = () => {
  return [
    body("username").isString().withMessage("O usuário/email é obrigatório!"),
    body("password")
      .notEmpty()
      .withMessage("A senha é obrigatória!")
      .isString()
      .withMessage("A senha é obrigatória!"),
  ];
};

const updateUserValidation = () => {
  return [
    body("username")
      .optional()
      .isString()
      .withMessage("O Username é obrigatório!")
      .isLength({ min: 3 })
      .withMessage("O Username precisa ter no mínimo 3 caracteres."),
    body("email")
      .optional()
      .isString()
      .withMessage("O Email é obrigatório!")
      .isEmail()
      .withMessage("O Email precisa ser válido!"),
    body("password")
      .optional()
      .isString()
      .withMessage("A senha é obrigatória!")
      .isLength({ min: 5 })
      .withMessage("A senha deve ter ao menos 5 caracteres."),
    body("language")
      .optional()
      .notEmpty()
      .withMessage("A linguagem é obrigatória!"),
    body("description")
      .optional()
      .isString()
      .withMessage("")
      .isLength({ min: 5 })
      .withMessage("A linguagem é obrigatória!"),
  ];
};

module.exports = {
  createUserValidation,
  loginUserValidation,
  updateUserValidation,
};
