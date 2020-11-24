const express = require("express");
const router = express.Router();

const {
  createCountry,
  find,
  findCountryById,
  updateCountryById,
  deleteCountryById,
} = require("../controller/country.controller");

const authentication = require("../middlewares/authentication.middleware");
const verify = require("../middlewares/verify.middleware");

router.post(
  "/createCountry",
  /* authentication, */ (req, res) => {
    createCountry(req, res);
  }
);

router.get(
  "/find",
  /* authentication, */ (req, res) => {
    find(req, res);
  }
);

router.get(
  "/findCountryById/:id",
  /* authentication, */ (req, res) => {
    findCountryById(req, res);
  }
);

router.put(
  "/updateCountryById/:id",
  /* authentication, */ (req, res) => {
    updateCountryById(req, res);
  }
);

router.delete(
  "/deleteCountryById/:id",
  /* authentication, */ (req, res) => {
    deleteCountryById(req, res);
  }
);

module.exports = router;
