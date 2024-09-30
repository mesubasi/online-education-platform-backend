const CourseModel = require("../models/CourseModel");
const jwt = require("jsonwebtoken");

const postCourse = async (req, res) => {
  try {
    const newCourse = new CourseModel(req.body);
    await newCourse.save();
    res.status(201).json("Course added succesfully.");
  } catch (err) {
    res.status(500).json({ error: "Course Failed", details: err.message });
  }
};
module.exports = { postCourse };
