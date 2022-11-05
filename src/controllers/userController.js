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
    fullName: request.body.fullName,
    age: request.body.age,
    email: request.body.email,
    password: request.body.password,
    phone: request.body.phone,
    address: request.body.address,
    gender: request.body.gender,
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

module.exports.getAllFavProducts = (request, response, next) => {
  User.find({ _id: request.params.id })
    .populate({ path: "favorites" })
    .select({ favoriteProducts: 1, _id: 1 })
    .then((data) => {
      if (data == null) {
        next(new Error("User Favorite product is not defined"));
      } else {
        response.status(200).json(data);
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.updateFavProduct = (request, response, next) => {
  User.findByIdAndUpdate(
    { _id: request.params.id },
    { $addToSet: { favorites: request.body.favorites } }
  )
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.removeFavProduct = (request, response, next) => {
  User.updateOne(
    { _id: request.params.id },
    { $pull: { favorites: request.body.favorites } }
  )

    .then((data) => {
      response.status(200).json({ data: "deleted" });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.uploadUserImage = (request, response, next) => {
  // response.status(201).json("Cover Image Uploaded");
  console.log(request.file);
  console.log(request.file.path);

  User.findOne({ _id: request.params.id })
    .then((data) => {
      console.log(data);
      if (data == null) next(new Error("User Doesn't Exist"));
      data.image = request.file.path;
      data.save();
      response.status(201).json("Image has been uploaded");
    })
    .catch((error) => next(error));
};

// TODO Needs to be enhanced(user can delete his image,user can update it but when choose update he should upload image)
module.exports.updateUserImage = (request, response, next) => {
  console.log(request.file);
  let imagePath;
  if (request.file) {
    let newPath = request.file.path.split("\\");
    console.log(newPath);
    newPath.shift();
    imagePath = newPath.join("/");
    console.log(newPath, imagePath);
  }
  const newUserImage = request.file ? imagePath : "";
  User.findOneAndUpdate({ _id: request.params.id }, { image: newUserImage })

    .then((data) => {
      unlinkAsync(data.image);
      if (data == null) next(new Error("User Doesn't Exist"));
      response.status(201).json("User Image has been updated");
    })
    .catch((error) => next(error));
};
