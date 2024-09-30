const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.post("/courses", courseController.postCourse);
router.get("/courses", courseController.getCourse);

module.exports = router;
