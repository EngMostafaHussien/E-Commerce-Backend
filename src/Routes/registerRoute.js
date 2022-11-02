const express = require("express");
const router = express.Router();

const Register = require("../controllers/signUpController");

router
  .route("/register")

  .post(Register.signup);

module.exports = router;
