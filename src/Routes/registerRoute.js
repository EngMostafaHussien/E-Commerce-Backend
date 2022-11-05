const express = require("express");
const router = express.Router();

const User = require("../controllers/userController");
const Admin = require("../controllers/adminController");

router.route("/register").post(User.createUser);

router.route("/register/admin").post(Admin.createAdmin);

module.exports = router;
