const express = require("express");
const validationMW = require("../middlewares/validationMW");

const productController = require("../controllers/productController");
const { authMW, adminOnly } = require("../middlewares/authMW");

const router = express.Router();

router
  .route("/products")
  .get(validationMW, productController.getAllProducts)
  .post(validationMW, productController.createProduct);

router
  .route("/product/:id")
  .get(validationMW, productController.getProductByID)
  .put(validationMW, productController.updateProduct)
  .delete(validationMW, productController.deleteProduct);

module.exports = router;
