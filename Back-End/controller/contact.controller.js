const Contact = require("../models/Contacts.model");

const createContact = async (req, res) => {
  const {
    name,
    lastname,
    email,
    company,
    region,
    country,
    city,
    address,
    interest,
  } = req.body;
  const newContact = new Contact({
    name,
    lastname,
    email,
    company,
    region,
    country,
    city,
    address,
    interest,
  });
  const savedContact = await newContact.save();
  res.status(200).json(savedContact);
};

const find = (req, res) => {
  Contact.findAll()
    .then((contact) => {
      res.status(200).json(contact);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Sorry, the server has presented an error. Try again later",
      });
    });
};

const findContactById = (req, res) => {
  let id = req.params.id;
  Contact.findOne({ where: { id: id } }).then((contact) => {
    res.status(200).json(contact);
  });
};

const updateContactById = (req, res) => {
  let id = req.params.id;
  let data = req.body;

  console.log(data);
  Contact.update(data, { where: { id: id } })
    .then((contact) => {
      if (contact[0] === 1)
        res.status(200).json({ message: "Contact has been updated." });
      else res.status(400).json({ message: "Contact could not be updated" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Sorry, the server has presented an error. Try again later",
      });
    });
};

const deleteContactById = (req, res) => {
  let id = req.params.id;
  Contact.destroy({ where: { id: id } })
    .then((contact) => {
      if (contact === 1)
        res.status(200).json({ message: "Contact has been deleted." });
      else res.status(400).json({ message: "Contact could not be deleted" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Sorry, the server has presented an error. Try again later",
      });
    });
};

module.exports = {
  createContact,
  find,
  findContactById,
  updateContactById,
  deleteContactById,
};
