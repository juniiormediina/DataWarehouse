const express = require("express");
const router = express.Router();

const {
  createCountry,
  find,
  findCountryById,
  updateCountryById,
  deleteCountryById,
} = require("../controller/country.controller");

router.post("/createCountry", (req, res) => {
  createCountry(req, res);
});

router.get("/find", (req, res) => {
  find(req, res);
});

router.get("/findCountryById/:id", (req, res) => {
  findCountryById(req, res);
});

router.put("/updateCountryById/:id", (req, res) => {
  updateCountryById(req, res);
});

router.delete("/deleteCountryById/:id", (req, res) => {
  deleteCountryById(req, res);
});

module.exports = router;
