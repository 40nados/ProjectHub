const User = require("../models/user");

const checkEmailVerified = async (req, res, next) => {
  try {
    const reqUser = req.params.userid;

    const user = await User.findById(reqUser);
    //console.log(reqUser);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.emailVerified === false) {
      return res
        .status(200)
        .json({ message: "Você precisa verificar seu email para prosseguir!" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = checkEmailVerified;
