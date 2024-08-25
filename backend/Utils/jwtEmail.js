const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateVerificationToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

module.exports = { generateVerificationToken };
