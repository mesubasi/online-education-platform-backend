const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.post("/courses/post", courseController.postCourse);
router.get("/courses/get", courseController.getCourse);

module.exports = router;
