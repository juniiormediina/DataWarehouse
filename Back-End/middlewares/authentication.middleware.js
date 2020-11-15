const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  let authoritzation = req.headers.authoritzation;
  if (authoritzation) {
    let token = authoritzation.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoding) => {
      if (err) {
        res.status(401).json("Invalid Token");
      }
      req.users = decoding;
      next();
    });
  } else {
    res
      .status(401)
      .json(
        "You must be logged in correctly to continue using our application"
      );
  }
};

module.exports = authentication;
