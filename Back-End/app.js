const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

/* Initializations */
const app = express();

/* Middlewares */
app.use(morgan("dev"));
app.use(helmet());
app.use(function (__, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5501");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT", "POST", "GET", "DELETE");
  next();
});
app.use(express.json());

/* Routes */
app.use("/api/users", require("./routes/user.routes"));

module.exports = app;
