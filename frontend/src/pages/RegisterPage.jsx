import {
  EnvelopeIcon,
  LockClosedIcon,
  PhotoIcon,
  UserCircleIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import register from "../assets/2.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/userSlice";
import { Toaster, toast } from "react-hot-toast";
import Loader from "../components/Loader";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.user);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    profileImage: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("gender", data.gender);
    formData.append("profileImage", data.profileImage);

    dispatch(registerUser(formData))
      .unwrap()
      .then(() => {
        navigate("/login");
        toast.success("Registration successful, you can now login", {
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

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData({
        ...data,
        [e.target.name]: e.target.files[0],
      });
    }
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
            backgroundImage: `url(${register})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <form
            onSubmit={handleSubmit}
            className=" w-1/4 flex flex-col items-center justify-center rounded-md p-10 gap-2 shadow-2xl bg-black/30"
          >
            <h1 className="text-3xl font-bold">Register</h1>
            <div className="w-full mt-5 relative flex items-center">
              <UserIcon className="w-6 h-6 absolute left-2 text-black" />
              <input
                type="text"
                className="w-full p-2 pl-10 border border-zinc-400 rounded-md focus:outline-none text-black"
                placeholder="First Name"
                onChange={handleChange}
                name="firstName"
                value={data.firstName}
              />
            </div>
            <div className="w-full mt-5 relative flex items-center">
              <UsersIcon className="w-6 h-6 absolute left-2 text-black" />
              <input
                type="text"
                className="w-full p-2 pl-10 border border-zinc-400 rounded-md focus:outline-none text-black"
                placeholder="Last Name"
                onChange={handleChange}
                name="lastName"
                value={data.lastName}
              />
            </div>
            <div className="w-full mt-5 relative flex items-center">
              <EnvelopeIcon className="w-6 h-6 absolute left-2 text-black" />
              <input
                type="text"
                className="w-full p-2 pl-10 border border-zinc-400 rounded-md focus:outline-none text-black"
                placeholder="Email address"
                onChange={handleChange}
                name="email"
                value={data.email}
              />
            </div>
            <div className="w-full mt-5 relative flex items-center">
              <LockClosedIcon className="w-6 h-6 absolute left-2 text-black" />
              <input
                type="password"
                className="w-full p-2 border pl-10 border-zinc-400 rounded-md focus:outline-none text-black"
                placeholder="Enter you password"
                onChange={handleChange}
                name="password"
                value={data.password}
              />
            </div>
            <div className="w-full mt-5 relative flex items-center">
              <UserCircleIcon className="w-6 h-6 absolute left-2 text-black" />
              <input
                type="text"
                className="w-full p-2 pl-10 border border-zinc-400 rounded-md focus:outline-none text-black"
                placeholder="Gender"
                onChange={handleChange}
                name="gender"
                value={data.gender}
              />
            </div>
            <div className="w-full mt-5 relative flex items-center">
              <PhotoIcon className="w-6 h-6 absolute left-2 text-black" />
              <input
                type="file"
                className="w-full p-2 pl-10 border border-zinc-400 bg-white rounded-md focus:outline-none text-black file:text-inherit file:rounded-full file:border-none"
                placeholder="Gender"
                onChange={handleImageChange}
              />
            </div>
            <button className="w-full bg-blue-500 rounded-md p-2 text-white mt-5 hover:bg-blue-600 duration-150">
              Register
            </button>
            <p className="text-sm text-white mt-5">
              Already registered!{" "}
              <Link to="/login" className="hover:text-blue-500">
                {" "}
                Sign in
              </Link>
            </p>
          </form>
        </main>
      )}
    </>
  );
};

export default RegisterPage;
