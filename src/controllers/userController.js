const mongoose = require("mongoose");
require("../model/user.model");

let User = mongoose.model("users");

module.exports.getAllUsers = (request, response, next) => {
  User.find({})
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getUserByID = (request, response, next) => {
  User.findOne({ _id: request.params.id })
    .then((data) => {
      if (data == null) next(new Error(" teacher not found"));
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.createUser = (request, response, next) => {
  let object = new User({
    fullName: request.body.fullName,
    password: request.body.password,
    age: request.body.age,
    email: request.body.email,
    address: request.body.address,
    gender: request.body.gender,
    phone: request.body.phone,
  });
  object
    .save()
    .then((data) => {
      response.status(201).json({ data: "added" });
    })
    .catch((error) => next(error));
};

module.exports.updateUser = async (request, response, next) => {
  try {
    const data = await User.findById(request.body.id);
    for (const key in request.body) {
      data[key] = request.body[key];
    }

    await data.save();
    response.status(200).json({ data: "updated" });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUser = (request, response, next) => {
  User.deleteOne({ _id: request.params.id })
    .then((data) => {
      if (!data) {
        next(new Error(" User not found"));
      } else {
        response.status(200).json({ data: "deleted" });
      }
    })
    .catch((error) => {
      next(error);
    });
};
