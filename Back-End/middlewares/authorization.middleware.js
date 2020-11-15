const authorization = (req, res, next) => {
  const { profile } = req.Users.dataValues;
  if (profile !== "administrator") {
    res
      .status(401)
      .json("You don't have profiles to continue with this action");
  } else {
    next();
  }
};

module.exports = authorization;
