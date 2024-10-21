import { useEffect } from "react";
import CourseCard from "../components/CourseCard";
import HeroSection from "../components/HeroSection";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../features/courseSlice";
import Loader from "../components/Loader";
export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const { loading, allCourses } = useSelector((state) => state.courses);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="w-screen" style={{ height: "calc(100vh - 5rem)" }}>
          <div className="h-full px-[5%] py-5 overflow-y-auto">
            <HeroSection />
            <h1 className="text-3xl font-bold text-center mt-10">
              All the skills you need in one place
            </h1>
            <p className="text-center text-xl text-zinc-400">
              From critical skills to technical topics, Udemy supports your
              professional development.
            </p>
            {allCourses?.length > 0 && <CourseCard data={allCourses} />}
          </div>
        </main>
      )}
    </>
  );
}
