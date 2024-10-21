import { useSelector } from "react-redux";
import CourseCard from "../components/CourseCard";

export default function InstructorHome() {
  const { user } = useSelector((state) => state.user);
  const { allCourses } = useSelector((state) => state.courses);

  const instructorCourses = allCourses.filter(
    (c) =>
      c.instructor.firstName === user.firstName &&
      c.instructor.lastName === user.lastName
  );

  return (
    <main className="px-[5%] py-[2%]">
      <h1 className="text-5xl font-semibold">
        Hello{" "}
        <span className="font-bold">
          {user?.firstName + " " + user?.lastName}
        </span>
      </h1>
      <h1 className="text-xl mt-10">
        Welcome to your instructor&apos;s dashboard. Here you can manage your
        courses, manage students, and track your progress.
      </h1>
      <h1 className="mt-10 text-xl">
        My Courses ({instructorCourses?.length})
      </h1>
      <CourseCard data={instructorCourses} />
    </main>
  );
}
