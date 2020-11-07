const { DataTypes } = require("sequelize");
const sequelize = require("../models/index");

const regionModel = sequelize.define(
  "Region",
  {
    name: {
      type: String,
    },
  },
  {
    timestamps: false,
    tableName: "Region",
  }
);

module.exports = regionModel;
