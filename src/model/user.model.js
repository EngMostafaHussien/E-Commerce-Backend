const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
  fullName: {
    type: String,
    required: [true, "user name is required"],
    match: [
      /^[A-Z][A-Za-z ]{3,}[A-Z][A-Za-z ]{3,}[A-Z][A-Za-z ]{3,}$/,
      "please enter fullName (three words)the first letter capital ",
    ],
  },
  age: {
    type: Number,
    min: 18,
    required: [true, "user age is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "user email is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "user password is required"],
  },
  phone: {
    type: String,
    required: [true, "user phone number is required"],
    match: [/^(002)?^01[1205][0-9]{8}$/, "Please fill a valid phone number"],
  },

  image: {
    type: String,
    default: "../utilities/images/user.jpg",
  },
  favorites: {
    type: mongoose.Types.ObjectId,
    ref: "products",
  },
  address: {
    city: {
      type: String,
      required: [true, "address city is required"],
    },
    streetName: {
      type: String,
      required: [true, "address street name is required"],
    },
    buildingNumber: {
      type: Number,
      required: [true, "address building number is required"],
    },
  },
});

module.exports = mongoose.model("users", schema);
