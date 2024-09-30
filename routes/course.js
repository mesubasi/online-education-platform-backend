const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.post("/add-course", courseController.handleCourse);

module.exports = router;
