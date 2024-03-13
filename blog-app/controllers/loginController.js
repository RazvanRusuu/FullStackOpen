const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { JWT_SECRET } = require("../utils/config");

const loginController = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const correctPassword = await bcrypt.compare(password, user.passwordHash);

  if (!(user || correctPassword)) {
    return res
      .status(404)
      .json({ status: "fail", message: "Wrong user or password" });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, JWT_SECRET, { expiresIn: "1d" });

  res.cookie("blog_auth", token, {
    maxAge: Date.now() + 900000,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });

  res
    .status(200)
    .json({ data: { username: user.username, name: user.name, token } });
};

module.exports = loginController;
