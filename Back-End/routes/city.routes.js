const express = require("express");
const router = express.Router();

const {
  createCity,
  find,
  findCityById,
  updateCityById,
  deleteCityById,
} = require("../controller/city.controller");

const authentication = require("../middlewares/authentication.middleware");
const verify = require("../middlewares/verify.middleware");

router.post(
  "/createCity",
  /* authentication, */ (req, res) => {
    createCity(req, res);
  }
);

router.get(
  "/find",
  /* authentication, */ (req, res) => {
    find(req, res);
  }
);

router.get(
  "/findCityById/:id",
  /* authentication, */ (req, res) => {
    findCityById(req, res);
  }
);

router.put(
  "/updateCityById/:id",
  /* authentication, */ (req, res) => {
    updateCityById(req, res);
  }
);

router.delete(
  "/deleteCityById/:id",
  /* authentication, */ (req, res) => {
    deleteCityById(req, res);
  }
);

module.exports = router;
