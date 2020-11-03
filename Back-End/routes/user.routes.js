const express = require("express");
const router = express.Router();

const { signUp, signIn } = require("../controller/user.controller");
const {
  checkDuplicateUserNameOrEmail,
  checkRolesExisted,
} = require("../middlewares/verifySignUp.middleware");

router.post(
  "/signup",
  [checkDuplicateUserNameOrEmail, checkRolesExisted],
  (req, res) => {
    signUp(req, res);
  }
);

router.post("/signin", (req, res) => {
  signIn(req, res);
});

module.exports = router;
