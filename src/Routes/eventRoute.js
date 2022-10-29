const express = require("express");
const validationMW = require("../middlewares/validationMW");
const authMW = require("../middlewares/authMW");
const { body, param, query } = require("express-validator");
const eventController = require("../controllers/eventController");
const router = express.Router();

router
  .route("/event")
  .get(eventController.getAllEvents)
  .post(
    [
      body("title").isString().withMessage("event title should be characters"),
      body("eventData").isDate().withMessage("event date should be date"),
      body("mainSpeaker")
        .isString()
        .withMessage("mainSpeaker name should be characters"),
      body("speakers")
        .isString()
        .withMessage("mainSpeaker name should be characters"),
      body("students")
        .isString()
        .withMessage("students name should be characters"),
    ],
    validationMW,
    eventController.createEvent
  )
  .put(
    [
      body("title").isString().withMessage("event title should be characters"),
      body("eventData").isDate().withMessage("event date should be date"),
      body("mainSpeaker")
        .isString()
        .withMessage("mainSpeaker name should be characters"),
      body("speakers")
        .isString()
        .withMessage("mainSpeaker name should be characters"),
      body("students")
        .isString()
        .withMessage("students name should be characters"),
    ],
    validationMW,
    eventController.updateEvent
  );

router
  .route("/event/:id")
  .get(
    [param("id").isNumeric().withMessage("event id should be number")],
    validationMW,
    eventController.getEventByID
  )
  .delete(
    [param("id").isNumeric().withMessage("event id should be number")],
    validationMW,
    eventController.deleteEvent
  );

module.exports = router;
