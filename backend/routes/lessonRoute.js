import { Router } from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isInstructor from "../middlewares/isInstructor.js";
import {
  createLesson,
  deleteLesson,
  getAllLessons,
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
router.get("/:id", getAllLessons);
router.delete("/:id", isLoggedIn, isInstructor, deleteLesson);

export default router;
