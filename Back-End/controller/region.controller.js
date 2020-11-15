const Region = require("../models/Region.model");

const createRegion = async (req, res) => {
  const { name } = req.body;
  const newRegion = new Region({
    name,
  });
  const savedRegion = await newRegion.save();
  res.status(200).json(savedRegion);
};

const find = (req, res) => {
  Region.findAll()
    .then((region) => {
      res.status(200).json(region);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Sorry, the server has presented an error. Try again later",
      });
    });
};

const findRegionById = (req, res) => {
  let id = req.params.id;
  Region.findOne({ where: { id: id } }).then((region) => {
    res.status(200).json(region);
  });
};

const updateRegionById = (req, res) => {
  let id = req.params.id;
  let data = req.body;

  console.log(data);
  Region.update(data, { where: { id: id } })
    .then((region) => {
      if (region[0] === 1)
        res.status(200).json({ message: " Region has been updated." });
      else res.status(400).json({ message: "Region could not be updated" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Sorry, the server has presented an error. Try again later",
      });
    });
};

const deleteRegionById = (req, res) => {
  let id = req.params.id;
  Region.destroy({ where: { id: id } })
    .then((region) => {
      if (region === 1)
        res.status(200).json({ message: "Region has been deleted." });
      else res.status(400).json({ message: "Region could not be deleted" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Sorry, the server has presented an error. Try again later",
      });
    });
};

module.exports = {
  createRegion,
  find,
  findRegionById,
  updateRegionById,
  deleteRegionById,
};
