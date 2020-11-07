const { DataTypes } = require("sequelize");
const sequelize = require("../models/index");

const companiesModel = sequelize.define(
  "Companies",
  {
    name: {
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
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    tableName: "Companies",
  }
);

module.exports = companiesModel;
