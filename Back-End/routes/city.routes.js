const express = require("express");
const router = express.Router();

const {
  createCity,
  find,
  findCityById,
  updateCityById,
  deleteCityById,
} = require("../controller/city.controller");

router.post("/createCity", (req, res) => {
  createCity(req, res);
});

router.get("/find", (req, res) => {
  find(req, res);
});

router.get("/findCityById/:id", (req, res) => {
  findCityById(req, res);
});

router.put("/updateCityById/:id", (req, res) => {
  updateCityById(req, res);
});

router.delete("/deleteCityById/:id", (req, res) => {
  deleteCityById(req, res);
});

module.exports = router;
