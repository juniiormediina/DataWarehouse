const { DataTypes } = require("sequelize");
const sequelize = require("../models/index");

const Contacts = sequelize.define(
  "Contacts",
  {
    fullName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    interest: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "Contacts",
  }
);

module.exports = Contacts;
