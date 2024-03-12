const bcrypt = require("bcrypt");
const User = require("../models/User");

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

  console.log(savedUser);

  res.status(201).json({ status: "succes", user: savedUser });
};

module.exports = {
  getUsers,
  createUsers,
};
