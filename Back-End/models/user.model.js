const { DataTypes } = require("sequelize");
const sequelize = require("../models/index");

/* const bcrypt = require("bcryptjs"); */

const userModel = sequelize.define(
  "Users",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(10),
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    roles: {
      allowNull: false,
      type: DataTypes.STRING(20),
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "User",
  }
);

module.exports = userModel;
