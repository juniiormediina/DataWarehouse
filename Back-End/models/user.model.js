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
      type: DataTypes.STRING(10),
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "User",
    /* hooks: {
      beforeCreate: function (user, options) {
        return new Promise((resolve, reject) => {
          bcrypt.hash(user.password, 8, (err, data) => {
            if (err) reject(err);
            user.password = data;
            resolve();
          });
        });
      },
    }, */
  }
);

/* encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
}; */

/* userModel.beforeCreate(encryptPassword);
userModel.beforeCreate(comparePassword); */

/* userModel.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userModel.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
}; */

module.exports = userModel;
