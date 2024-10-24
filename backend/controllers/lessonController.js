import Lesson from "../models/lessonModel.js";
import Courses from "../models/courseModel.js";
import asyncHandler from "express-async-handler";

export const createLesson = asyncHandler(async (req, res) => {
  const { title, duration } = req.body;
  const videoUrl = req.file?.path;
  const courseId = req.params.id;

  const course = await Courses.findById(courseId);
  if (!course) {
    return res.status(404).json({
      status: "error",
      message: "Course not found!",
    });
  }

  const lessonExists = course.lessons.some((l) => l.title === title);

  if (lessonExists) {
    return res.status(400).json({
      status: "error",
      message: "Lesson with the same title already exists in this course!",
    });
  }
  const lesson = await Lesson.create({
    title,
    videoUrl,
    duration,
    course: courseId,
  });

  course.lessons.push(lesson._id);
  await course.save();

  res.status(201).json({
    status: "success",
    message: "Lesson created successfully",
    data: lesson,
  });
});

export const getAllLessons = asyncHandler(async (req, res) => {
  const courseId = req.params.id;
  const course = await Courses.findById(courseId).populate("lessons");
  if (!course) {
    return res.status(404).json({
      status: "error",
      message: "Course not found!",
    });
  }

  const lessons = course.lessons;
  res.status(200).json({
    status: "success",
    data: lessons,
  });
});

export const deleteLesson = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findByIdAndDelete(req.params.id);

  if (!lesson) {
    return res.status(404).json({
      status: "error",
      message: "Lesson not found!",
    });
  }

  const course = await Courses.findByIdAndUpdate(
    lesson.course,
    { $pull: { lessons: lesson._id } },
    { new: true }
  );

  if (!course) {
    return res.status(404).json({
      status: "error",
      message: "Course not found!",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Lesson deleted successfully",
    _id: lesson._id,
  });
});
