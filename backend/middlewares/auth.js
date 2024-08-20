// authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();


// Middleware de autenticação
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Token inválido
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // Nenhum token fornecido
  }
};

module.exports = authenticateJWT;