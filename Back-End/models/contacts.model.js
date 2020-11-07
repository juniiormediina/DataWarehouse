const { DataTypes } = require("sequelize");
const sequelize = require("../models/index");

const contactsModel = sequelize.define(
  "Contacts",
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    interest: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    tableName: "Contacts",
  }
);

module.exports = contactsModel;
