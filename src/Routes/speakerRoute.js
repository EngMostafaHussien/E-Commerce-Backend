const express = require("express");
const speaker = require("../controllers/speakerController");
const validationMW = require("../middlewares/validationMW");
const authMW = require("../middlewares/authMW");
const { body, param, query } = require("express-validator");
const router = express.Router();

router
  .route("/speaker")
  .all(authMW, (request, response, next) => {
    if (request.role == "admin") next();
    else {
      let error = new Error("Not authorized");
      error.status = 403;
      next(error);
    }
  })
  .get(speaker.getAllSpeakers)
  .post(
    [
      body("fullname")
        .isString()
        .withMessage("speaker name should be characters"),
      body("password").isString().withMessage("password should be characters"),
      body("email").isEmail().withMessage("email should be email"),
      body("address").isObject().withMessage("address should be object"),
    ],
    validationMW,
    speaker.createSpeaker
  )
  .put(
    [
      body("fullname")
        .isString()
        .withMessage("speaker name should be characters"),
      body("password").isString().withMessage("password should be characters"),
      body("email").isEmail().withMessage("email should be email"),
      body("address").isObject().withMessage("address should be string"),
    ],
    validationMW,
    speaker.updateSpeaker
  );

router
  .route("/speaker/:id")
  .get(
    [param("id").isMongoId().withMessage("speaker id should be objectID")],
    validationMW,
    speaker.getSpeakerByID
  )
  .delete(
    [param("id").isMongoId().withMessage("speaker id should be objectID")],
    validationMW,
    speaker.deleteSpeaker
  );
module.exports = router;
