import User from "../models/userModel.js";

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userAuthId);
  if (user?.role === "Admin") {
    next();
  } else {
    next(new Error("Access denied"));
  }
};

export default isAdmin;
