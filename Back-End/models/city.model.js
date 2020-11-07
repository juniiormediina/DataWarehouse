const { DataTypes } = require("sequelize");
const sequelize = require("../models/index");

const cityModel = sequelize.define(
  "City",
  {
    name: {
      type: String,
    },
  },
  {
    timestamps: false,
    tableName: "City",
  }
);

module.exports = cityModel;
