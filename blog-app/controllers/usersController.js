const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const getUsers = async (req, res) => {
  const users = await User.find().populate("blogs", { username: 0, id: 0 });

  res.json({ status: "success", data: users });
};

const createUsers = async (req, res) => {
  const { username, name, password } = req.body;
  const saltRounds = 10;

  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  const token = jwt.sign(
    { username: savedUser.username, id: savedUser._id },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("auth_token", JSON.stringify(token), {
    maxAge: Date.now() + 900000,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });

  res.status(201).json({ status: "succes", user: savedUser, token });
};

module.exports = {
  getUsers,
  createUsers,
};
