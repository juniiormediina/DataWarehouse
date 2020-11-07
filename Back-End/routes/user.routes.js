const express = require("express");
const router = express.Router();

const { signup, signin } = require("../controller/user.controller");

router.post("/signup", (req, res) => {
  res.send("Signup");
});

router.post("/signin", (req, res) => {
  res.send("Signin");
});

module.exports = router;
