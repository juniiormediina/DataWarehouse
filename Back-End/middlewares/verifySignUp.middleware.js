const User = require("../models/user.model");
const Role = require("../models/role.model");

const checkDuplicateUserNameOrEmail = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).json({ message: "The user already exists" });

  const email = await User.findOne({ email: req.body.email });
  if (email)
    return res.status(400).json({ message: "The email already exists" });

  next();
};

const checkRolesExisted = async (req, res, next) => {
  const rol = await Role.find({ name: req.body.roles });

  if (rol.length == req.body.roles.length) {
    next();
  } else {
    let cont = 0,
      text = "";
    for (let i = 0; i < req.body.roles.length; i++) {
      for (let j = 0; j < rol.length; j++) {
        if (req.body.roles[i] == rol[j].name) cont++;
      }
      text += cont == 0 ? req.body.roles[i] + ", " : "";
      cont = 0;
    }
    return res.status(400).json({ message: `Role ${text} does not exist` });
  }
};

module.exports = {
  checkDuplicateUserNameOrEmail,
  checkRolesExisted,
};
