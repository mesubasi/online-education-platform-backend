const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.post("/courses", courseController.handleCourse);

module.exports = router;
