const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/DataWarehouse", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then((db) => console.log("DB is connected"))
  .catch((error) => console.log(error));
