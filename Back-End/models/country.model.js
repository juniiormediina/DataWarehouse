const { DataTypes } = require("sequelize");
const sequelize = require("../models/index");

const countryModel = sequelize.define(
  "Country",
  {
    name: {
      type: String,
    },
  },
  {
    timestamps: false,
    tableName: "Country",
  }
);

module.exports = countryModel;
