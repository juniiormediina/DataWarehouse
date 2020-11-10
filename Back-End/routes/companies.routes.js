const express = require("express");
const router = express.Router();

const {
  findCompanies,
  createCompanies,
  findCompaniesById,
  updateCompaniesById,
  deleteCompaniesById,
} = require("../controller/companies.controller");

router.post("/createCompanies", (req, res) => {
  createCompanies(req, res);
});

router.get("/find", (req, res) => {
  findCompanies(req, res);
});

router.get("/findCompaniesById/:id", (req, res) => {
  findCompaniesById(req, res);
});

router.put("/updateCompaniesById/:id", (req, res) => {
  updateCompaniesById(req, res);
});

router.delete("/deleteCompaniesById/:id", (req, res) => {
  deleteCompaniesById(req, res);
});

module.exports = router;
