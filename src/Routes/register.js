const mongoose = require("mongoose");

require("../model/speaker.model");
require("../model/student.model");

let Speaker = mongoose.model("speakers");
let Student = mongoose.model("students");

const bcrypt = require("bcrypt");

const saltRounds = 10;

module.exports = (req, res, next) => {
  let speaker = new Speaker({
    id: mongoose.Types.ObjectId,
    fullname: request.body.fullname,
    password: bcrypt.hashSync(req.body.password, saltRounds),
    email: request.body.email,
    address: request.body.address,
    role: request.body.role,
  });
  speaker
    .save()
    .then((data) => {
      response.status(201).json({ data: "regestired", data });
    })
    .catch((error) => {
      next(error);
    });
  let student = new Student({
    fullname: request.body.fullname,
    password: bcrypt.hashSync(req.body.password, saltRounds),
    email: request.body.email,
  });
  student
    .save()
    .then((data) => {
      response.status(201).json({ data: "regestired", data });
    })
    .catch((error) => {
      next(error);
    });
};
