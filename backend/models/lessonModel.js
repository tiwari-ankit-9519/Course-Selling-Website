import mongoose from "mongoose";

const lessonModel = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
    },
    duration: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Lesson = mongoose.model("Lesson", lessonModel);

export default Lesson;
