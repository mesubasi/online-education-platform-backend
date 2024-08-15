const mongoose = require("mongoose");
const { Schema } = mongoose;

const lessonModel = new Schema(
  {
    title: { type: String, required: true },
    videourl: { type: String, required: true },
    material: { type: Schema.Types.Mixed, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("lessonModel", lessonModel);
