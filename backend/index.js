import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoute.js";
import lessonRoutes from "./routes/lessonRoute.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/courses/", courseRoutes);
app.use("/api/lessons", lessonRoutes);

app.use(errorHandler);
app.use(notFound);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
