import User from "../models/userModel.js";

const isInstructor = async (req, res, next) => {
  const user = await User.findById(req.userAuthId);
  if (user?.role === "Instructor") {
    next();
  } else {
    next(new Error("Access denied"));
  }
};

export default isInstructor;
