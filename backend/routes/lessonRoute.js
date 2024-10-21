import { Router } from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isInstructor from "../middlewares/isInstructor.js";
import {
  createLesson,
  deleteLesson,
  getAllLessons,
  getAllLessonsForSingleCourse,
} from "../controllers/lessonController.js";
import upload from "../config/fileUpload.js";

const router = Router();

router.post(
  "/:id",
  isLoggedIn,
  isInstructor,
  upload.single("videoUrl"),
  createLesson
);
router.get("/:id", isLoggedIn, getAllLessons);
router.get("/lesson/:id", isLoggedIn, getAllLessonsForSingleCourse);
router.delete("/:id", isLoggedIn, isInstructor, deleteLesson);

export default router;
