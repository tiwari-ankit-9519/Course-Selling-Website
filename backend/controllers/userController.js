import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { createUserSchema, loginUserSchema } from "../utils/zodValidations.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, gender } = req.body;

  const profileImage = req.file?.path;

  const result = createUserSchema.safeParse({
    firstName,
    lastName,
    email,
    password,
    gender,
  });

  if (!result.success) {
    const errorMessage = result.error.errors.map((err) => err.message);
    return res.status(411).json({
      status: "error",
      message: errorMessage,
    });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(409).json({
      status: "error",
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    profileImage: profileImage,
    gender,
  });

  res.status(201).json({
    status: "success",
    message: "User created Successfully",
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = loginUserSchema.safeParse({
    email,
    password,
  });

  if (!result.success) {
    const errorMessage = result.error.errors
      .map((err) => err.message)
      .join(", ");
    return res.status(411).json({
      status: "error",
      message: errorMessage,
    });
  }

  const userExists = await User.findOne({ email });

  if (!userExists) {
    return res.status(404).json({
      status: "error",
      message: "User not found!",
    });
  }

  const validPassword = await bcrypt.compare(password, userExists.password);

  if (!validPassword) {
    return res.status(403).json({
      status: "error",
      message: "Please enter correct password",
    });
  }

  const { password: userPassword, ...userWithoutPassword } = userExists._doc;

  res.json({
    status: "success",
    message: "User Logged In Successfully",
    user: userWithoutPassword,
    token: generateToken(userExists?._id),
  });
});

export const profile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userAuthId).populate("purchasedCourses");
  res.json({
    status: "success",
    message: "Profile fetched Successfully",
    user,
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, gender, password } = req.body;
  const profileImage = req.file?.path;

  const updatedFields = {
    ...(firstName && { firstName }),
    ...(lastName && { lastName }),
    ...(email && { email }),
    ...(gender && { gender }),
    ...(profileImage && { profileImage }),
  };

  if (password) {
    const salt = await bcrypt.genSalt(10);
    updatedFields.password = await bcrypt.hash(password, salt);
  }

  if (Object.keys(updatedFields).length === 0) {
    return res.status(400).json({
      status: "fail",
      message: "No fields provided for update",
    });
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.userAuthId,
    updatedFields,
    { new: true }
  ).populate("purchasedCourses");

  res.json({
    status: "success",
    message: "Profile updated successfully",
    updatedUser,
  });
});
