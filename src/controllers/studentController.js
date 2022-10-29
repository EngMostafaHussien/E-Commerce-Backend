const mongoose = require("mongoose");
require("../model/student.model");

let Student = mongoose.model("students");

module.exports.getAllStudents = (request, response, next) => {
  Student.find({})
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getStudentByID = (request, response, next) => {
  Student.findOne({ _id: request.params.id })
    .then((data) => {
      if (data == null) next(new Error(" Student not found"));
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.createStudent = (request, response, next) => {
  let object = new Student({
    _id: request.body.id,
    fullname: request.body.fullname,
    password: request.body.password,
    email: request.body.email,
  });
  object
    .save()
    .then((data) => {
      response.status(201).json({ data: "added" });
    })
    .catch((error) => next(error));
};

module.exports.updateStudent = async (request, response, next) => {
  try {
    const data = await Student.findById(request.body.id);
    for (const key in request.body) {
      data[key] = request.body[key];
    }

    await data.save();
    response.status(200).json({ data: "updated" });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteStudent = (request, response, next) => {
  Student.deleteOne({ _id: request.params.id })
    .then((data) => {
      if (!data) {
        next(new Error(" Student not found"));
      } else {
        response.status(200).json({ data: "deleted" });
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.uploadStudent = (request, response, next) => {
  console.log(request.file);
  Student.findOne({ _id: request.params.id })
    .then((data) => {
      response.status(200).json({ data: "uploaded" });
    })
    // .save()
    .catch((error) => {
      next(error);
    });
};
