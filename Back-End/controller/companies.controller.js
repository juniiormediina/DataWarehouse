const Companies = require("../models/Companies.model");

const createCompanies = async (req, res) => {
  const { name, country, city, address, email, phone } = req.body;
  const newCompany = new Companies({
    name,
    country,
    city,
    address,
    email,
    phone,
  });
  const savedCompany = await newCompany.save();
  res.status(200).json(savedCompany);
};

const findCompanies = (req, res) => {
  Companies.findAll()
    .then((company) => {
      res.status(200).json(company);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "I'm Sorry, the server has presented an error. Try again later",
      });
    });
};

const findCompaniesById = (req, res) => {
  let id = req.params.id;
  Companies.findOne({ where: { id: id } }).then((company) => {
    res.status(200).json(company);
  });
};

const updateCompaniesById = (req, res) => {
  let id = req.params.id;
  let data = req.body;
  Companies.update(data, { where: { id: id } })
    .then((company) => {
      if (company[0] === 1)
        res.status(200).json({ message: "Company updated" });
      else res.status(404).json({ message: "Company could not be updated" });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "I'm Sorry, the server has presented an error. Try again later",
      });
    });
};

const deleteCompaniesById = (req, res) => {
  let id = req.params.id;
  Companies.destroy({ where: { id: id } })
    .then((company) => {
      if (company === 1) res.status(200).json({ message: " User deleted." });
      else res.status(400).json({ message: "User could not be deleted" });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "I'm Sorry, the server has presented an error. Try again later",
      });
    });
};

module.exports = {
  findCompanies,
  createCompanies,
  findCompaniesById,
  updateCompaniesById,
  deleteCompaniesById,
};
