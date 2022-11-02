const bcrypt = require("bcrypt");
const User = require("../model/user.model");
const saltRounds = 10;

module.exports.signup = (request, response, next) => {
  const user = {
    fullName: `${request.body.firstName} ${request.body.middleName} ${request.body.lastName}`,
    age: request.body.age,
    gender: request.body.gender,
    email: request.body.email,
    phone: request.body.phone,
  };

  User.exists({
    $or: [{ email: user.email }, { phone: user.phone }],
  })
    .then((data) => {
      console.log(data);
      if (data) throw new Error("email or phone is duplicated");

      return bcrypt.hash(request.body.password, saltRounds);
    })

    .then((hash) => {
      user.password = hash;
    })
    .then(() => {
      const object = new User(user);
      return object.save();
    })
    .then((userInfo) => notifyUser("user_signup", userInfo))
    .then((userInfo) => {
      response.status(201).json({ userInfo });
      // return { name: data.fullName, email: data.email }
    })
    .catch((error) => next(error));
};
