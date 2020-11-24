const express = require("express");
const router = express.Router();

const {
  findCompanies,
  createCompanies,
  findCompaniesById,
  updateCompaniesById,
  deleteCompaniesById,
} = require("../controller/companies.controller");

const authentication = require("../middlewares/authentication.middleware");
const verify = require("../middlewares/verify.middleware");

router.post(
  "/createCompanies",
  /* authentication, */ (req, res) => {
    createCompanies(req, res);
  }
);

router.get(
  "/find",
  /* authentication, */ (req, res) => {
    findCompanies(req, res);
  }
);

router.get(
  "/findCompaniesById/:id",
  /* authentication, */ (req, res) => {
    findCompaniesById(req, res);
  }
);

router.put(
  "/updateCompaniesById/:id",
  /* authentication, */ (req, res) => {
    updateCompaniesById(req, res);
  }
);

router.delete(
  "/deleteCompaniesById/:id",
  /* authentication, */ (req, res) => {
    deleteCompaniesById(req, res);
  }
);

module.exports = router;
