const { DataTypes } = require("sequelize");
const sequelize = require("../models/index");

const countryModel = sequelize.define(
  "Country",
  {
    name: {
      type: DataTypes.STRING(50),
    },
  },
  {
    timestamps: false,
    tableName: "Country",
  }
);

module.exports = countryModel;
