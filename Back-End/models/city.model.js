const { DataTypes } = require("sequelize");
const sequelize = require("../models/index");

const cityModel = sequelize.define(
  "City",
  {
    name: {
      type: DataTypes.STRING(15),
    },
  },
  {
    timestamps: false,
    tableName: "City",
  }
);

module.exports = cityModel;
