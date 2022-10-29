const express = require("express");
const validationMW = require("../middlewares/validationMW");
const authMW = require("../middlewares/authMW");
const { body, param, query } = require("express-validator");
const studentController = require("../controllers/studentController");
const router = express.Router();

router
  .route("/student")
  .all(authMW, (request, response, next) => {
    if (request.role == "admin") next();
    else {
      let error = new Error("Not authorized");
      error.status = 403;
      next(error);
    }
  })
  .get(studentController.getAllStudents)
  .post(
    [
      body("id").isNumeric().withMessage("student id should be number"),
      body("fullname")
        .isString()
        .withMessage("student name should be characters"),
      body("password")
        .isString()
        .withMessage("student password should be string"),
      body("email").isString().withMessage("student email should be string"),
    ],
    validationMW,
    studentController.createStudent
  )
  .put(
    [
      body("id").isNumeric().withMessage("student id should be number"),
      body("fullname")
        .isString()
        .withMessage("student name should be characters"),
      body("password")
        .isString()
        .withMessage("student password should be string"),
      body("email").isString().withMessage("student email should be string"),
    ],
    validationMW,
    studentController.updateStudent
  );

router
  .route("/student/:id")
  .get(
    [param("id").isNumeric().withMessage("student id should be number")],
    validationMW,
    studentController.getStudentByID
  )
  .delete(
    [param("id").isNumeric().withMessage("student id should be number")],
    validationMW,
    studentController.deleteStudent
  );

module.exports = router;
