import Lesson from "../models/lessonModel.js";
import asyncHandler from "express-async-handler";

export const createLesson = asyncHandler(async (req, res) => {
  const { title, duration } = req.body;
  const videoUrl = req.file?.path;
  const lessonExists = await Lesson.findOne({ title });

  if (lessonExists) {
    return res.status(409).json({
      status: "error",
      message: "Lesson already exists!",
    });
  }

  const lesson = await Lesson.create({
    title,
    videoUrl,
    duration,
    course: req.params.courseId,
  });

  res.status(201).json({
    status: "success",
    message: "Lesson created successfully",
    data: lesson,
  });
});

export const deleteLesson = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findByIdAndDelete(req.params.lessonId);
  if (!lesson) {
    return res.status(404).json({
      status: "error",
      message: "Lesson not found!",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Lesson deleted successfully",
  });
});
