const { DataTypes } = require("sequelize");
const sequelize = require("../models/index");
const Country = require("../models/Country.model");

const City = sequelize.define(
  "City",
  {
    name: {
      type: DataTypes.STRING(50),
    },
  },
  {
    timestamps: false,
    tableName: "City",
  }
);

Country.hasMany(City);
City.belongsTo(Country);

module.exports = City;
