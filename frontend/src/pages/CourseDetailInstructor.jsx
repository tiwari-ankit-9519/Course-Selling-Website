import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { getSinlgeCourse } from "../features/courseSlice";
import { useEffect } from "react";

export default function CourseDetailInstructor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singleCourse, loading } = useSelector((state) => state.courses);
  useEffect(() => {
    dispatch(getSinlgeCourse(id));
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
          <div className="mt-10">
            <h1 className="text-xl">Add Lesson</h1>
          </div>
        </main>
      )}
    </>
  );
}
