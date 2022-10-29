const mongoose = require("mongoose");
const addressSchema = require("./address.model");

const schema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  name: {
    firstName: {
      type: String,
      minlength: 3,
      required: [true, "user fullName is required"],
    },
    lastName: {
      type: String,
      minlength: 3,
      required: [true, "user fullName is required"],
    },
  },
  age: {
    type: Number,
    required: [true, "user age is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "user email is required"],
    // match:{}
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: [true, "user gender is required"],
  },
  password: {
    type: String,
    required: [true, "user password is required"],
  },
  phone: { type: String, required: [true, "user phone is required"] },

  image: {
    type: String,
    default: "./user.jpg",
  },
  favorites: {
    type: mongoose.Types.ObjectId,
    ref: "products",
  },
  address: addressSchema,
});

mongoose.model("users", schema);
mongoose.model("addressSchema", schema);
