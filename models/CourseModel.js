const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    trainer: { type: String, required: true },
    courselist: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CourseModel", courseSchema);
