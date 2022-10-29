const mongoose = require("mongoose");
require("../model/speaker.model");

let Speaker = mongoose.model("speakers");

module.exports.getAllSpeakers = (request, response, next) => {
  Speaker.find({})
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getSpeakerByID = (request, response, next) => {
  Speaker.findOne({ _id: request.params.id })
    .then((data) => {
      if (data == null) next(new Error(" teacher not found"));
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.createSpeaker = (request, response, next) => {
  let object = new Speaker({
    fullname: request.body.fullname,
    password: request.body.password,
    email: request.body.email,
    address: request.body.address,
    role: request.body.role,
  });
  object
    .save()
    .then((data) => {
      response.status(201).json({ data: "added" });
    })
    .catch((error) => next(error));
};

module.exports.updateSpeaker = async (request, response, next) => {
  try {
    const data = await Speaker.findById(request.body.id);
    for (const key in request.body) {
      data[key] = request.body[key];
    }

    await data.save();
    response.status(200).json({ data: "updated" });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteSpeaker = (request, response, next) => {
  Speaker.deleteOne({ _id: request.params.id })
    .then((data) => {
      if (!data) {
        next(new Error(" Speaker not found"));
      } else {
        response.status(200).json({ data: "deleted" });
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.uploadSpeaker = (request, response, next) => {
  console.log(request.file);
  Speaker.findOne({ _id: request.params.id })
    .then((data) => {
      response.status(200).json({ data: "uploaded" });
    })
    .catch((error) => {
      next(error);
    });
};
