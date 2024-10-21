import Lesson from "../models/lessonModel.js";
import Courses from "../models/courseModel.js";
import asyncHandler from "express-async-handler";

export const createLesson = asyncHandler(async (req, res) => {
  const { title, duration } = req.body;
  const videoUrl = req.file?.path;
  const courseId = req.params.id;

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
    course: courseId,
  });

  const course = await Courses.findById(courseId);
  if (!course) {
    return res.status(404).json({
      status: "error",
      message: "Course not found!",
    });
  }

  course.lessons.push(lesson._id);
  await course.save();

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

export const getAllLessons = asyncHandler(async (req, res) => {
  const lessonId = req.params.id;
  const lessons = await Lesson.findById(lessonId).populate("course");
  res.json({
    status: "success",
    data: lessons,
  });
});

export const getAllLessonsForSingleCourse = asyncHandler(async (req, res) => {
  const lessons = await Lesson.find({ course: req.params.id });
  res.json({
    status: "success",
    data: lessons,
  });
});
