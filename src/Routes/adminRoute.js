const express = require("express");
const validationMW = require("../middlewares/validationMW");

const adminController = require("../controllers/adminController");
const { authMW, adminOnly } = require("../middlewares/authMW");

const router = express.Router();

router
  .route("/admins")
  .get(validationMW, adminController.getAllAdmins)
  .post(validationMW, adminController.createAdmin)
  .put(validationMW, adminController.updateAdmin);

router
  .route("/admin/:id")
  .get(validationMW, adminController.getAdminByID)
  .delete(validationMW, adminController.deleteAdmin);

module.exports = router;
