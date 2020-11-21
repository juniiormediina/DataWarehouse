const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.NAME_DB,
  process.env.USER,
  process.env.PASS,
  {
    host: process.env.HOST,
    dialect: "mysql",
    define: {
      freezeTableName: true,
    },
    query: {
      raw: true,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.log("DB is no connected");
  });

module.exports = sequelize;
