/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

const CourseCard = ({ data }) => {
  const navigate = useNavigate();
  const renderStars = (rating) => {
    const starPercentage = (rating / 5) * 100;

    return (
      <div className="relative text-xl">
        <div className="text-gray-300">★★★★★</div>
        <div
          className="absolute left-0 top-0 overflow-hidden text-yellow-400"
          style={{ width: `${starPercentage}%` }}
        >
          ★★★★★
        </div>
      </div>
    );
  };

  return (
    <div className="grid 2xl:grid-cols-5 md:grid-cols-3 grid-cols-2 w-full gap-y-5 gap-x mt-10 overflow-auto">
      {data.map((course) => {
        return (
          <div
            onClick={() => {
              navigate(`/course/${course._id}`);
            }}
            key={course._id}
            className="flex flex-col flex-grow border text-sm shadow-2xl cursor-pointer transform duration-200 rounded-md font-poppins bg-white text-black w-[90%]"
          >
            <img
              className="h-40 rounded-tl-md rounded-tr-md"
              src={course.courseImage}
              alt={course.title}
            />
            <div className="p-5 flex flex-col gap-2 h-[50%]">
              <h3 className="text-xl font-bold">{course.title}</h3>
              <p className="text-sm text-gray-500">
                {course.instructor.firstName + " " + course.instructor.lastName}
              </p>
              <div className="flex items-center gap-1">
                {renderStars(course.rating)}
                <p className="text-sm text-gray-500">
                  ({course.rating === "" ? 0 : course.rating})
                </p>
              </div>
              <p className="font-extrabold text-lg">${course.price}</p>
              <div className="text-sm text-gray-500">
                {course.category.map((c) => (
                  <p key={c._id}>{c.name}</p>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseCard;
