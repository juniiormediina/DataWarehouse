const express = require("express");
const router = express.Router();

const {
  createRegion,
  find,
  findRegionById,
  updateRegionById,
  deleteRegionById,
} = require("../controller/region.controller");

const authentication = require("../middlewares/authentication.middleware");
const verify = require("../middlewares/verify.middleware");

router.post("/createRegion", authentication, (req, res) => {
  createRegion(req, res);
});

router.get("/find", authentication, (req, res) => {
  find(req, res);
});

router.get("/findRegionById/:id", authentication, (req, res) => {
  findRegionById(req, res);
});

router.put("/updateRegionById/:id", authentication, (req, res) => {
  updateRegionById(req, res);
});

router.delete("/deleteRegionById/:id", authentication, (req, res) => {
  deleteRegionById(req, res);
});

module.exports = router;
