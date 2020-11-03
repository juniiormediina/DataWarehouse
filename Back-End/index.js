const app = require("./app");
require("./database");

/* Settings */
app.set("port", process.env.PORT || 4000);

/* Starting the server */
app.listen(app.get("port"), () => {
  console.log("Server on Port", app.get("port"));
});
