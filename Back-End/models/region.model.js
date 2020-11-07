const { DataTypes } = require("sequelize");
const sequelize = require("../models/index");

const regionModel = sequelize.define(
  "Region",
  {
    name: {
      type: DataTypes.STRING(50),
    },
  },
  {
    timestamps: false,
    tableName: "Region",
  }
);

module.exports = regionModel;
