const app = require("./app");

require("./models/index.js");
require("./models/User.model").sync();
require("./models/Contacts.model").sync();
require("./models/Companies.model").sync();
require("./models/Country.model").sync();
require("./models/Region.model").sync();
require("./models/City.model").sync();

app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), () => {
  console.log("Server started...");
});
