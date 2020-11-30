const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization)
    return res.status(403).json({ message: "No Token provided" });

  let token = authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(400).json("User can not verify");
    }
    req.profile = decoded;
    next();
  });
};

module.exports = authentication;
