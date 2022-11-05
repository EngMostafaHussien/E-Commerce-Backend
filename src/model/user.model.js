const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
  fullName: {
    fisrtName: { type: String, required: [true, "user firstName is required"] },
    lastName: { type: String, required: [true, "user lastName is required"] },
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
  favorites: [
    {
      type: mongoose.Types.ObjectId,
      ref: "products",
    },
  ],
  cart: [{ type: mongoose.Types.ObjectId, ref: "carts" }],
  
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
