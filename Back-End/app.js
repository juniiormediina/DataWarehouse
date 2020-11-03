const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

/* Initializations */
const app = express();
require("./libs/initialSetup");

/* Middelwares */
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

/* Routes */

app.use("/users", require("./routes/user.routes"));

module.exports = app;
