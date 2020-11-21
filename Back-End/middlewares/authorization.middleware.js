const authorization = async (req, res, next) => {
  const { profile } = req.usuario;
  if (profile !== "administrator") {
    res
      .status(401)
      .json(
        "You don't have profiles of administrator to continue with this action"
      );
  } else {
    next();
  }
};

module.exports = authorization;
