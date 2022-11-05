const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
});

module.exports = mongoose.model("carts", schema);
