const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const signUp = async (req, res) => {
  const { firstName, lastName, email, profile, password } = req.body;
  const newUser = new User({
    firstName,
    lastName,
    email,
    profile,
    password: await encryptPassword(password),
  });

  const savedUser = await newUser.save();

  res.status(200).json(savedUser);
};

const signIn = (req, res) => {
  const userFound = User.findOne({ where: { email: req.body.email } });
  if (!userFound) return res.status(400).json({ message: "User not found" });

  const matchPassword = comparePassword(req.body.password, userFound.password);
  if (!matchPassword)
    return res.status(401).json({ token: null, message: "Invalid password" });

  //TODO:Verificar porque genera error (OJO ESTA FUNCIONANDO BIEN)
  const token = jwt.sign({ id: userFound.id }, process.env.JWT_SECRET, {
    expiresIn: 86400, // 24 hours
  });
  res.status(200).json({ token });
};

const find = (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Sorry, the server has presented an error. Try again later",
      });
    });
};

const findById = (req, res) => {
  let id = req.params.id;
  User.findOne({ where: { id: id } }).then((user) => {
    res.status(200).json(user);
  });
};

//TODO: nota recibiendo el llamado de la ruta en el postman
const updateById = (req, res) => {
  let id = req.params.id;
  let data = req.body;

  User.update(data, { where: { id: id } })
    .then((response) => {
      if (response[0] === 1)
        res.status(200).json({ message: " User has been updated." });
      else res.status(400).json({ message: "User could not be updated" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Sorry, the server has presented an error. Try again later",
      });
    });
};

const deleteById = (req, res) => {
  let id = req.params.id;
  User.destroy({ where: { id: id } })
    .then((user) => {
      if (user === 1)
        res.status(200).json({ message: "User has been deleted." });
      else res.status(400).json({ message: "User could not be deleted" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Sorry, the server has presented an error. Try again later",
      });
    });
};

encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

module.exports = { signUp, signIn, find, findById, updateById, deleteById };
