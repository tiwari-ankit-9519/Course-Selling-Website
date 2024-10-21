import { Router } from "express";
import isInstructor from "../middlewares/isInstructor.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  getCourseByTitle,
  getCoursesByCategory,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import upload from "../config/fileUpload.js";

const router = Router();

router.post(
  "/create-course",
  isLoggedIn,
  upload.single("courseImage"),
  isInstructor,
  createCourse
);
router.put("/update-course", isLoggedIn, isInstructor, updateCourse);
router.get("/courses", getAllCourses);
router.get("/courses/:id", getCourseById);
router.get("/courses/search", getCourseByTitle);
router.get("/courses/category", getCoursesByCategory);
router.delete("/courses/:id", isLoggedIn, isInstructor, deleteCourse);

export default router;
