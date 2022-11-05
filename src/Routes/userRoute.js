const express = require("express");
const validationMW = require("../middlewares/validationMW");

const userController = require("../controllers/userController");
const { authMW, adminOnly } = require("../middlewares/authMW");

const router = express.Router();

router
  .route("/users")
  .get(validationMW, userController.getAllUsers)
  .post(validationMW, userController.createUser);

router
  .route("/user/:id")
  .get(validationMW, userController.getUserByID)
  .put(validationMW, userController.updateUser)
  .delete(validationMW, userController.deleteUser);

module.exports = router;
