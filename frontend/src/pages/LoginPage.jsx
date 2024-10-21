import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import login from "../assets/2.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/userSlice";
import Loader from "../components/Loader";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    dispatch(loginUser(data))
      .unwrap()
      .then((result) => {
        if (result && result?.role === "Instructor") {
          navigate("/instructor-home");
        } else if (result && result?.role === "Student") {
          navigate("/");
        } else {
          navigate("/dashboard");
        }
        toast.success("Login Successful", {
          position: "center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err, {
          position: "center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <>
      <Toaster />
      {loading ? (
        <Loader />
      ) : (
        <main
          className="flex justify-center items-center w-full"
          style={{
            height: "calc(100vh - 5rem)",
            backgroundImage: `url(${login})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="h-[60%] w-1/4 flex flex-col items-center justify-center rounded-md p-10 gap-2 shadow-2xl bg-black/30"
          >
            <h1 className="text-3xl font-bold">Welcome Back👋</h1>
            <p className="text-sm">Continue leveling up your skills</p>
            <div className="w-full mt-5 relative flex items-center">
              <EnvelopeIcon className="w-6 h-6 absolute left-2 text-black" />
              <input
                type="text"
                className="w-full p-2 pl-10 border border-zinc-400 rounded-md focus:outline-none text-black"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="w-full mt-5 relative flex items-center">
              <LockClosedIcon className="w-6 h-6 absolute left-2 text-black" />
              <input
                type="password"
                className="w-full p-2 border pl-10 border-zinc-400 rounded-md focus:outline-none text-black"
                placeholder="Enter you password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button className="w-full bg-blue-500 rounded-md p-2 text-white mt-5 hover:bg-blue-600 duration-150">
              Sign In
            </button>
            <p className="text-sm text-white mt-5">
              Not registered yet!{" "}
              <Link to="/register" className="hover:text-blue-500">
                {" "}
                Sign up
              </Link>
            </p>
          </form>
        </main>
      )}
    </>
  );
};

export default LoginPage;
