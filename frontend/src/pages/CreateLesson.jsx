import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate, useParams } from "react-router-dom";
import { createLessons } from "../features/lessonSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function CreateLesson() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.lessons);
  const { id } = useParams();

  const [data, setData] = useState({
    title: "",
    duration: "",
    videoUrl: null,
  });

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData({
        ...data,
        videoUrl: file,
      });
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("duration", data.duration);
    formData.append("videoUrl", data.videoUrl);

    dispatch(createLessons({ id, lessonData: formData }))
      .unwrap()
      .then((result) => {
        console.log(result.message);
        navigate(`/course/${id}`);
        toast.success(result.data.message, {
          autoClose: 5000,
          hideProgressBar: false,
        });
      })
      .catch((error) => {
        toast.error(error, {
          autoClose: 5000,
          hideProgressBar: false,
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
          className="px-[5%] py-[2%]"
          style={{ height: "calc(100vh - 5rem)" }}
        >
          <div className="flex justify-between">
            <div className="flex items-center gap-5">
              <ArrowLeftIcon
                className="w-6 h-6 cursor-pointer"
                onClick={() => navigate(-1)}
              />
              <h1 className="text-3xl">Create Lesson</h1>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex justify-center h-[60%] mt-28"
          >
            <div className="w-1/3 h-full p-[2%] border-zinc-800 border rounded flex flex-col justify-center gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Title of the video</label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="title"
                  value={data.title}
                  className="px-3 py-2 text-black focus:outline-none rounded"
                  placeholder="Ex: What is HTML?"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Duration of the video</label>
                <input
                  type="number"
                  onChange={handleChange}
                  value={data.duration || ""}
                  name="duration"
                  className="px-3 py-2 text-black focus:outline-none rounded"
                  placeholder="Ex: 5"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Upload the video</label>
                <input
                  type="file"
                  className="bg-white w-full text-black p-2 rounded-md focus:outline-none file:bg-black file:text-white file:border-none file:rounded-full file:mr-3"
                  onChange={handleVideoChange} // No value binding needed for file input
                />
              </div>
              <button className="px-4 py-2 border border-zinc-800 rounded-md mt-3">
                Create Lesson
              </button>
            </div>
          </form>
        </main>
      )}
    </>
  );
}
