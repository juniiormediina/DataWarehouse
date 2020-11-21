const express = require("express");
const router = express.Router();

const {
  createContact,
  find,
  findContactById,
  updateContactById,
  deleteContactById,
} = require("../controller/contact.controller");

const authentication = require("../middlewares/authentication.middleware");
const verify = require("../middlewares/verify.middleware");

router.post(
  "/createContact",
  /* authentication, */ (req, res) => {
    createContact(req, res);
  }
);

router.get(
  "/find",
  /* authentication, */ (req, res) => {
    find(req, res);
  }
);

router.get("/findContactById/:id", authentication, (req, res) => {
  findContactById(req, res);
});

router.put("/updateContactById/:id", authentication, (req, res) => {
  updateContactById(req, res);
});

router.delete("/deleteContactById/:id", authentication, (req, res) => {
  deleteContactById(req, res);
});

module.exports = router;
