import { Router } from "express";
import {
  createUser,
  loginUser,
  profile,
} from "../controllers/userController.js";
import upload from "../config/fileUpload.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const router = Router();

router.post("/register", upload.single("profileImage"), createUser);
router.post("/login", loginUser);
router.get("/me", isLoggedIn, profile);

export default router;
