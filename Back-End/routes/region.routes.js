const express = require("express");
const router = express.Router();

const {
  createRegion,
  find,
  findRegionById,
  updateRegionById,
  deleteRegionById,
} = require("../controller/region.controller");

router.post("/createRegion", (req, res) => {
  createRegion(req, res);
});

router.get("/find", (req, res) => {
  find(req, res);
});

router.get("/findRegionById/:id", (req, res) => {
  findRegionById(req, res);
});

router.put("/updateRegionById/:id", (req, res) => {
  updateRegionById(req, res);
});

router.delete("/deleteRegionById/:id", (req, res) => {
  deleteRegionById(req, res);
});

module.exports = router;
