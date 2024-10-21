import { Link } from "react-router-dom";
import designer from "../assets/Designer.png";

const HeroSection = () => {
  return (
    <div className="h-[60vh] mt-10 flex rounded-md overflow-hidden shadow-2xl">
      <img
        src={designer}
        alt="Hero Illustration"
        className="h-full w-[50%] rounded-tl-md rounded-bl-md"
      />

      <div className="flex flex-col justify-center gap-5 items-start p-10 w-[50%] bg-gradient-to-r from-white to-gray-100">
        <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">
          Unlock Your Potential with Expert-Led Online Courses
        </h1>

        <p className="text-xl text-gray-600">
          Learn New Skills Anytime, Anywhere
        </p>

        <p className="text-md text-gray-500 max-w-[90%] leading-relaxed">
          Explore thousands of courses designed to help you achieve your goals.
          Join a community of learners and start building your future today!
        </p>

        <Link
          to="/login"
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-md text-lg font-medium shadow-md transition duration-300 ease-in-out"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
