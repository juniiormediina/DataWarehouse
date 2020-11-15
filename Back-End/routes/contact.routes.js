const express = require("express");
const router = express.Router();

const {
  createContact,
  find,
  findContactById,
  updateContactById,
  deleteContactById,
} = require("../controller/contact.controller");

router.post("/createContact", (req, res) => {
  createContact(req, res);
});

router.get("/find", (req, res) => {
  find(req, res);
});

router.get("/findContactById/:id", (req, res) => {
  findContactById(req, res);
});

router.put("/updateContactById/:id", (req, res) => {
  updateContactById(req, res);
});

router.delete("/deleteContactById/:id", (req, res) => {
  deleteContactById(req, res);
});

module.exports = router;
