const City = require("../models/City.model");

const createCity = async (req, res) => {
  const { name } = req.body;
  const newCity = new City({
    name,
  });
  const savedCity = await newCity.save();
  res.status(200).json(savedCity);
};

const find = (req, res) => {
  City.findAll()
    .then((city) => {
      res.status(200).json(city);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Sorry, the server has presented an error. Try again later",
      });
    });
};

const findCityById = (req, res) => {
  let id = req.params.id;
  City.findOne({ where: { id: id } }).then((city) => {
    res.status(200).json(city);
  });
};

const updateCityById = (req, res) => {
  let id = req.params.id;
  let data = req.body;

  console.log(data);
  City.update(data, { where: { id: id } })
    .then((city) => {
      if (city[0] === 1)
        res.status(200).json({ message: "City has been updated." });
      else res.status(400).json({ message: "City could not be updated" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Sorry, the server has presented an error. Try again later",
      });
    });
};

const deleteCityById = (req, res) => {
  let id = req.params.id;
  City.destroy({ where: { id: id } })
    .then((city) => {
      if (city === 1)
        res.status(200).json({ message: "City has been deleted." });
      else res.status(400).json({ message: "City could not be deleted" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Sorry, the server has presented an error. Try again later",
      });
    });
};

module.exports = {
  createCity,
  find,
  findCityById,
  updateCityById,
  deleteCityById,
};
