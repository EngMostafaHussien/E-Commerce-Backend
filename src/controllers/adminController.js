const bcrypt = require("bcrypt");
const Admin = require("../model/admin.model");

const saltRounds = 10;

// Get All Admins
module.exports.getAllAdmins = (request, response, next) => {
  Admin.find({})
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

// Get Admin By ID
module.exports.getAdminByID = (request, response, next) => {
  Admin.findOne({ _id: request.params.id })
    .then((data) => {
      if (data == null) next(new Error(" Admin not found"));
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

// Create Admin
module.exports.createAdmin = (request, response, next) => {
  const addAdmin = new Admin({
    fullName: request.body.fullName,
    age: request.body.age,
    email: request.body.email,
    password: request.body.password,
    phone: request.body.phone,
  });
  Admin.exists({
    $or: [{ email: addAdmin.email }, { phone: addAdmin.phone }],
  })
    .then((data) => {
      console.log(data);
      if (data) throw new Error("email or phone is duplicated");
      return bcrypt.hash(request.body.password, saltRounds);
    })
    .then((hash) => {
      addAdmin.password = hash;
    })
    .then(() => {
      const object = new Admin(addAdmin);
      return object.save();
    })
    .then((adminInfo) => {
      response.status(201).json({ adminInfo });
    })
    .catch((error) => next(error));
};

// Update Admin By ID
module.exports.updateAdmin = (request, response, next) => {
  Admin.findById({ _id: request.body.id })
    .then((data) => {
      for (const key in request.body) {
        data[key] = request.body[key];
      }
      data.save();
      response.status(200).json({ data: "updated" });
    })
    .catch((error) => {
      next(error);
    });
};

// Delete Admin By ID
module.exports.deleteAdmin = (request, response, next) => {
  Admin.deleteOne({ _id: request.params.id })
    .then((data) => {
      if (!data) {
        next(new Error(" Admin not found"));
      } else {
        response.status(200).json({ data: "deleted" });
      }
    })
    .catch((error) => {
      next(error);
    });
};
