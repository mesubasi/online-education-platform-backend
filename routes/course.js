const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.post("/", courseController.handleCourse);

module.exports = router;
