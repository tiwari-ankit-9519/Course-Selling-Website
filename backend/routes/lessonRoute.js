import { Router } from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isInstructor from "../middlewares/isInstructor.js";
import { createLesson, deleteLesson } from "../controllers/lessonController.js";

const router = Router();

router.post("/", isLoggedIn, isInstructor, createLesson);
router.delete("/:id", isLoggedIn, isInstructor, deleteLesson);

export default router;
