const mongoose = require("mongoose");
require("../model/product.model");

let Product = mongoose.model("products");

module.exports.getAllProducts = (request, response, next) => {
  Product.find({})
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getProductByID = (request, response, next) => {
  Product.findOne({ _id: request.params.id })
    .then((data) => {
      if (data == null) next(new Error(" Product not found"));
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.createProduct = (request, response, next) => {
  let object = new Product({
    title: request.body.title,
    price: request.body.price,
    description: request.body.description,
    category: request.body.category,
  });

  object
    .save()
    .then((data) => {
      response.status(201).json({ data: "added" });
    })
    .catch((error) => next(error));
};

module.exports.updateProduct = async (request, response, next) => {
  try {
    const data = await Product.findById(request.body.id);
    for (const key in request.body) {
      data[key] = request.body[key];
    }

    await data.save();
    response.status(200).json({ data: "updated" });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteProduct = (request, response, next) => {
  Product.deleteOne({ _id: request.params.id })
    .then((data) => {
      if (!data) {
        next(new Error(" Product not found"));
      } else {
        response.status(200).json({ data: "deleted" });
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.uploadProduct = (request, response, next) => {
  console.log(request.file);
  Product.findOne({ _id: request.params.id })
    .then((data) => {
      response.status(200).json({ data: "uploaded" });
    })
    // .save()
    .catch((error) => {
      next(error);
    });
};
