const bcrypt = require("bcrypt");
const User = require("../model/user.model");
const saltRounds = 10;

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
      if (data == null) next(new Error(" User not found"));
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.createUser = (request, response, next) => {
  const addUser = new User({
    fullName: `${request.body.firstName} ${request.body.lastName}`,
    age: request.body.age,
    gender: request.body.gender,
    phone: request.body.phone,
    email: request.body.email,
    password: request.body.password,
    address: `${request.body.city} ${request.body.streetName} ${request.body.buildingNumber}`,
  });
  User.exists({
    $or: [{ email: addUser.email }, { phone: addUser.phone }],
  })
    .then((data) => {
      console.log(data);
      if (data) throw new Error("email or phone is duplicated");
      return bcrypt.hash(request.body.password, saltRounds);
    })
    .then((hash) => {
      addUser.password = hash;
    })
    .then(() => {
      const object = new User(addUser);
      return object.save();
    })
    .then((userInfo) => {
      response.status(201).json({ userInfo });
    })
    .catch((error) => next(error));
};

module.exports.updateUser = async (request, response, next) => {
  try {
    const data = await User.findById({ _id: request.params.id });
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
