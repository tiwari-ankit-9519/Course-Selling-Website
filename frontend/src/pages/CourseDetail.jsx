import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useEffect } from "react";
import { getAllCourses, getSinlgeCourse } from "../features/courseSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { courseHighlights, webDevelopmentLessons } from "../utils/data";
import CourseCard from "../components/CourseCard";

const CourseDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, singleCourse, allCourses } = useSelector(
    (state) => state.courses
  );
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSinlgeCourse(id));
    dispatch(getAllCourses());
  }, [dispatch, id]);

  const date = new Date(singleCourse?.updatedAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const fiteredCourses = allCourses.filter(
    (course) =>
      course?.category?.name === singleCourse?.category?.name &&
      course?._id !== singleCourse?._id
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="px-[5%] py-[2%]">
          <div className="flex justify-between">
            <div className="flex items-center gap-5">
              <ArrowLeftIcon
                className="w-6 h-6 cursor-pointer"
                onClick={() => navigate(-1)}
              />
              <h1 className="text-3xl">Know about the course</h1>
            </div>
            <button className="px-8 py-2 border rounded-md">Buy Now</button>
          </div>
          <div className="mt-10 flex">
            <div className="w-[50%]">
              <img
                src={singleCourse?.courseImage}
                alt="courseImage"
                className="w-[100%]"
              />
            </div>
            <div className="flex flex-col gap-4 justify-center w-[50%] px-36">
              <h1 className="text-5xl font-semibold">{singleCourse?.title}</h1>
              <p className="text-md">{singleCourse?.description}</p>
              <p className="text-sm">
                <span className="text-zinc-400">Created by </span>{" "}
                {`${singleCourse?.instructor?.firstName} ${singleCourse?.instructor?.lastName}`}
              </p>
              <p className="text-sm">
                <span className="text-zinc-400">Last updated on </span>
                {formattedDate}
              </p>
            </div>
          </div>
          <hr className="border-none bg-zinc-700 h-[4px] mt-10" />
          <div className="mt-10 flex gap-5 h-[20rem]">
            <div className="flex flex-col p-3 md:p-5 w-[50%]">
              <h1 className="text-xl font-semibold">
                What you&apos;ll learn &gt;
              </h1>
              <ul className="list-disc pl-5 mt-2">
                {courseHighlights?.map((c) => (
                  <li className="" key={c}>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-[50%] flex flex-col p-5 overflow-scroll">
              <h1 className="text-xl font-semibold">Course Datails &gt;</h1>
              <ul className="mt-2 list-disc">
                {webDevelopmentLessons?.map((l, i) => (
                  <Link className="flex justify-between" key={i}>
                    {l.title}{" "}
                    <span className="text-zinc-400">{l.duration}</span>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          <hr className="border-none bg-zinc-700 h-[4px] mt-10" />
          <h1 className="mt-10 text-3xl font-semibold">
            Explore related courses
          </h1>
          <CourseCard data={fiteredCourses} />
          <hr className="border-none bg-zinc-700 h-[4px] mt-10" />
          <div className="flex justify-between">
            <h1 className="text-3xl font-semibold mt-10">
              Courses you may like
            </h1>
            <select className="bg-inherit p-2">
              <option value="" className="bg-black">
                Web Development
              </option>
              <option value="" className="bg-black hover:bg-white">
                Programming
              </option>
            </select>
          </div>
          <CourseCard data={allCourses} />
        </main>
      )}
    </>
  );
};

export default CourseDetail;
