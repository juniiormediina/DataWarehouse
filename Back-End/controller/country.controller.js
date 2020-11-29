const Country = require("../models/Country.model");

const createCountry = async (req, res) => {
  const { name, RegionId } = req.body;
  const newCountry = new Country({
    name,
    RegionId,
  });
  const savedCountry = await newCountry.save();
  res.status(200).json(savedCountry);
};

const find = (req, res) => {
  Country.findAll()
    .then((country) => {
      res.status(200).json(country);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Sorry, the server has presented an error. Try again later",
      });
    });
};

const findCountryById = (req, res) => {
  let id = req.params.id;
  Country.findOne({ where: { id: id } }).then((country) => {
    res.status(200).json(country);
  });
};

const findRegionCountry = (RegionId) => {
  /*   let { CountryId } = req.params;
  City.findAll({ where: { CountryId: CountryId } })
    .then((countryCity) => {
      res.status(200).json(countryCity);
      console.log("todo esta funcionando");
    })
    .catch((err) => {
      res.status(500).json({
        message: "Sorry, the server has presented an error. Try again later",
      });
    }); */

  return new Promise((res, rejc) => {
    Country.findAll({ where: { RegionId: RegionId } })
      .then((response) => {
        res(response);
      })
      .catch(() => {
        rejc({
          status: 500,
          message:
            "Tenemos problemas en el servidor, por favor intente mas tarde",
        });
      });
  });
};

const updateCountryById = (req, res) => {
  let id = req.params.id;
  let data = req.body;

  console.log(data);
  Country.update(data, { where: { id: id } })
    .then((country) => {
      if (country[0] === 1)
        res.status(200).json({ message: " Country has been updated." });
      else res.status(400).json({ message: "Country could not be updated" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Sorry, the server has presented an error. Try again later",
      });
    });
};

const deleteCountryById = (req, res) => {
  let id = req.params.id;
  Country.destroy({ where: { id: id } })
    .then((country) => {
      if (country === 1)
        res.status(200).json({ message: "Country has been deleted." });
      else res.status(400).json({ message: "Country could not be deleted" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Sorry, the server has presented an error. Try again later",
      });
    });
};

module.exports = {
  createCountry,
  find,
  findCountryById,
  findRegionCountry,
  updateCountryById,
  deleteCountryById,
};
