const mongoose = require("mongoose");

// some property lose
const schema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
  fullName: {
    fisrtName: {
      type: String,
      required: [true, "admin firstName is required"],
    },
    lastName: {
      type: String,
      required: [true, "admin lastName is required"],
    },
  },
  age: {
    type: Number,
    min: 18,
    required: [true, "admin age is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "admin email is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "admin password is required"],
  },
  phone: {
    type: String,
    required: [true, "admin phone number is required"],
    match: [/^(002)?^01[1205][0-9]{8}$/, "Please fill a valid phone number"],
  },
});

module.exports = mongoose.model("admins", schema);
