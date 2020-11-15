const express = require("express");
const router = express.Router();

const authorization = require("../middlewares/authorization.middleware");

const {
  signUp,
  signIn,
  find,
  findById,
  updateById,
  deleteById,
} = require("../controller/user.controller");

router.post("/signup", (req, res) => {
  signUp(req, res);
});

router.post("/signin", (req, res) => {
  signIn(req, res);
});

router.get("/find", (req, res) => {
  find(req, res);
});

router.get("/findById/:id", (req, res) => {
  findById(req, res);
});

router.put("/updateById/:id", (req, res) => {
  updateById(req, res);
});

router.delete("/deleteById/:id", [authorization], (req, res) => {
  deleteById(req, res);
});

module.exports = router;
