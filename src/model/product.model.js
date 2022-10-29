const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: [true, "product category is required"],
    enum: ["electronic", "jewelry", "men's clothing", "women's clothing"], // TODO we need to check if these are all the
  },
  image: {
    type: String,
    // required: [true, "product image is required"],
    default: "./default_cover.jpg",
  },
});

mongoose.model("products", schema);
