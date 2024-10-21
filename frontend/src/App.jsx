import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CourseDetail from "./pages/CourseDetail";
import InstructorHome from "./pages/InstructorHome";
import CreateCourse from "./pages/CreateCourse";
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/instructor-home" element={<InstructorHome />} />
        <Route path="/create-course" element={<CreateCourse />} />
      </Routes>
    </BrowserRouter>
  );
}
