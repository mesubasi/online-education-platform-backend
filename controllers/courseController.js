const CourseModel = require("../models/CourseModel");
const jwt = require("jsonwebtoken");

const postCourse = async (req, res) => {
  try {
    const existingTitle = await CourseModel.findOne({ title: req.body.title });

    //Başlık varsa kontrolü
    if (existingTitle) {
      return res.status(400).json({ error: "Enter a different title" });
    }

    const newCourse = new CourseModel(req.body);
    await newCourse.save();

    res.status(201).json("Course added succesfully.");
  } catch (err) {
    res.status(500).json({ error: "Course Failed", details: err.message });
  }
};

const getCourse = async (req, res) => {
  try {
    const course = await CourseModel.find();
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: "Course Failed", details: err.message });
  }
};
module.exports = { postCourse };
