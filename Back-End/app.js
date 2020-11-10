const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

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
app.use(cors());
app.options("*", cors());

/* Routes */
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/companies", require("./routes/companies.routes"));
app.use("/api/country", require("./routes/Country.routes"));
app.use("/api/city", require("./routes/City.routes"));
app.use("/api/region", require("./routes/Region.routes"));

module.exports = app;
