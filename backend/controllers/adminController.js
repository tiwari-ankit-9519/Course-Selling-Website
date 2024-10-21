import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

export const getUsersCount = asyncHandler(async (req, res) => {
  const totalStudentCount = await User.countDocuments({ role: "Student" });
  const totalInstructorCount = await User.countDocuments({
    role: "Instructor",
  });
  const totalCourseCount = await User.countDocuments({ role: "Course" });

  res.json({
    status: "success",
    message: "Users fetched successfully",
    totalStudentCount,
    totalInstructorCount,
    totalCourseCount,
  });
});

export const getUsersByRole = asyncHandler(async (req, res) => {
  const role = req.query.role;
  const users = await User.findOne({ role: role });
  res.json({
    status: "success",
    message: "Users fetched successfully",
    users,
  });
});

export const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId).populate("user");
  res.json({
    status: "success",
    message: "User fetched successfully",
    user,
  });
});
