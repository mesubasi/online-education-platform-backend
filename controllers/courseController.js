const CourseModel = require("../models/CourseModel");
const jwt = require("jsonwebtoken");

const handleCourse = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ error: "Course Failed", details: err.message });
  }
};
module.exports = { handleCourse };
