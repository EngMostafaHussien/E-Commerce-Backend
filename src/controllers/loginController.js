const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/user.model");
const Admin = require("../model/admin.model");

module.exports.loginUser = (request, response, next) => {
  console.log(request.body.email);

  User.findOne({
    email: request.body.email,
    // password: request.body.password,
  })
    .then((data) => {
      // console.log(data)
      if (!data) {
        const error = new Error("email or password incorrect");
        error.status = 401;
        throw error;
        // loginError()
      }
      bcrypt
        .compare(request.body.password, data.password)
        .then((result) => {
          if (!result) {
            const error = new Error("email or password incorrect");
            error.status = 401;
            throw error;
          }
          const token = jwt.sign(
            {
              id: data._id,
              role: "User",
            },
            process.env.secret,
            { expiresIn: "24h" }
          );
          response.status(200).json({ token, message: "login" });
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
};

module.exports.loginAdmin = (request, response, next) => {
  console.log(request.body.email);

  Admin.findOne({
    email: request.body.email,
  })
    .then((data) => {
      console.log(data);
      if (!data) {
        const error = new Error("email or password incorrect");
        error.status = 401;
        throw error;
      }
      bcrypt
        .compare(request.body.password, data.password)
        .then((result) => {
          if (!result) {
            const error = new Error("email or password incorrect");
            error.status = 401;
            throw error;
          }

          const token = jwt.sign(
            {
              id: data._id,
              role: "Admin",
            },
            process.env.secret,
            { expiresIn: "24h" }
          );
          response.status(200).json({ token, message: "login" });
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
};
