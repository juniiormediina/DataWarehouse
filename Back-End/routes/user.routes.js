const express = require("express");
const router = express.Router();

const {
  signUp,
  signIn,
  find,
  findById,
  updateById,
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

router.get("/find/:id", (req, res) => {
  findById(req, res);
});

router.put("/updateById/id", (req, res) => {
  updateById(req, res);
});

/* router.delete("/delete", (req, res) => {
  res.send("funcionando");
}); */

module.exports = router;
