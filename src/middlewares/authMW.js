const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
  let decodedToken = null;
  try {
    const token = request.get("Authorization").split(" ")[1];
    decodedToken = jwt.verify(token, appConfig.jwtSecret);
    console.log(decodedToken);
    request.role = decodedToken.role;
    request.id = decodedToken.id;
    next();
  } catch (error) {
    error.message = "Not Authorized";
    error.status = 403;
    next(error);
  }
};
