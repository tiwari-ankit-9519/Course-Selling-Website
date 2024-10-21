import Courses from "../models/courseModel.js";
import Category from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";
import { createCourseSchema } from "../utils/zodValidations.js";

export const createCourse = asyncHandler(async (req, res) => {
  const { title, description, price, category, keypoints } = req.body;

  const courseImage = req.file?.path;
  const instructor = req.userAuthId;

  const result = createCourseSchema.safeParse({
    title,
    description,
    price: parseInt(price),
    category,
    keypoints,
  });

  if (!result.success) {
    const errorMessage = result.error.errors.map((err) => err.message);
    return res.status(411).json({
      status: "error",
      message: errorMessage,
    });
  }

  const courseExists = await Courses.findOne({
    title: title.trim().toLowerCase(),
    instructor,
  });

  if (courseExists) {
    return res.status(400).json({
      status: "error",
      message: "Course with the same title and instructor already exists",
    });
  }

  const categoryExists = await Category.findOne({
    name: category.trim().toLowerCase(),
  });

  let newCourse;

  if (categoryExists) {
    newCourse = await Courses.create({
      title: title.trim().toLowerCase(),
      description,
      price,
      instructor,
      category: categoryExists._id,
      courseImage,
    });
  } else {
    const newCategory = await Category.create({
      name: category.trim().toLowerCase(),
    });
    newCourse = await Courses.create({
      title: title.trim().toLowerCase(),
      description,
      price,
      instructor,
      category: newCategory._id,
      courseImage,
    });
  }

  const course = await Courses.findById(newCourse._id).populate("category");

  res.status(201).json({
    status: "success",
    data: course,
  });
});

export const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Courses.find().populate("category").populate({
    path: "instructor",
    select: "-password",
  });
  res.json({
    status: "success",
    data: courses,
  });
});

export const getCourseById = asyncHandler(async (req, res) => {
  const course = await Courses.findById(req.params.id)
    .populate("category")
    .populate("lessons")
    .populate({
      path: "instructor",
      select: "-password",
    });
  if (!course) {
    return res.status(404).json({
      status: "error",
      message: "Course not found",
    });
  }
  res.json({
    status: "success",
    data: course,
  });
});

export const updateCourse = asyncHandler(async (req, res) => {
  const { title, description, price, category } = req.body;
  const courseImage = req.file?.path;

  const course = await Courses.findById(req.params.id);

  if (!course) {
    return res.status(404).json({
      status: "error",
      message: "Course not found",
    });
  }

  if (course.instructor.toString() !== req.userAuthId) {
    return res.status(403).json({
      status: "error",
      message: "You are not authorized to update this course",
    });
  }

  const updatedCourse = await Courses.findByIdAndUpdate(
    req.params.id,
    {
      title: title?.trim().toLowerCase(),
      description,
      price,
      courseImage: courseImage ? courseImage : course.courseImage, // Retain old image if not provided
    },
    { new: true, runValidators: true }
  ).populate("category");

  res.json({
    status: "success",
    data: updatedCourse,
  });
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Courses.findById(req.params.id);

  if (!course) {
    return res.status(404).json({
      status: "error",
      message: "Course not found",
    });
  }

  if (course.instructor.toString() !== req.userAuthId) {
    return res.status(403).json({
      status: "error",
      message: "You are not authorized to delete this course",
    });
  }

  await course.deleteOne();

  res.status(200).json({
    status: "success",
    message: "Course deleted successfully",
  });
});

export const getCourseByTitle = asyncHandler(async (req, res) => {
  const title = req.query.title;
  const course = await Courses.findOne({
    title: title.trim().toLowerCase(),
  }).populate("category");
  if (!course) {
    return res.status(404).json({
      status: "error",
      message: "Course not found",
    });
  }
  res.json({
    status: "success",
    data: course,
  });
});

export const getCoursesByCategory = asyncHandler(async (req, res) => {
  const categoryName = req.query.category.trim().toLowerCase();

  const category = await Category.findOne({ name: categoryName });
  if (!category) {
    return res.status(404).json({
      status: "error",
      message: "Category not found",
    });
  }

  const courses = await Courses.find({
    category: category._id,
  }).populate("category");

  if (courses.length === 0) {
    return res.status(404).json({
      status: "error",
      message: "No courses found in this category",
    });
  }

  res.json({
    status: "success",
    data: courses,
  });
});
