const express = require("express");
const validationMW = require("../middlewares/validationMW");

const productController = require("../controllers/productController");
const { authMW, adminOnly } = require("../middlewares/authMW");

const router = express.Router();

router
  .route("/products")
  .get(validationMW, productController.getAllProducts)
  .post(validationMW, productController.createProduct)
  .put(validationMW, productController.updateProduct);

router
  .route("/product/:id")
  .get(validationMW, productController.getProductByID)
  .delete(validationMW, productController.deleteProduct);

module.exports = router;
