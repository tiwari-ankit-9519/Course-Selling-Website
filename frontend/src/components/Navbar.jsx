import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { logout } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const isAuthenticated = localStorage.getItem("token");

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  const commonButtons = (
    <>
      <Link
        to={
          user?.role === "Instructor"
            ? "/instructor-home"
            : user?.role === "Admin"
            ? "/dashboard"
            : "/"
        }
      >
        Home
      </Link>
      <Link to="/courses">Courses</Link>
    </>
  );

  const authButtons =
    user || isAuthenticated ? (
      <>
        {user?.role === "Instructor" ? (
          <Link to="/create-course">Add Course</Link>
        ) : (
          <>
            <Link to="/my-courses">My Courses</Link>
            <Link to="/my-courses">My Profile</Link>
          </>
        )}
        <button onClick={handleLogout}>Logout</button>
      </>
    ) : (
      <>
        <Link to="/register">Sign up</Link>
        <Link to="/login">Sign in</Link>
      </>
    );

  return (
    <nav className="w-screen h-[5rem] flex items-center justify-between bg-zinc-800 text-white px-[5%] sticky top-0 z-10">
      <SearchBar />
      <ul className="flex items-center gap-5">
        {commonButtons}
        {authButtons}
      </ul>
    </nav>
  );
}
