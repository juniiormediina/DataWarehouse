const { DataTypes } = require("sequelize");
const sequelize = require("../models/index");
const Region = require("../models/Region.model");

const Country = sequelize.define(
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

Region.hasMany(Country);
Country.belongsTo(Region);

module.exports = Country;
