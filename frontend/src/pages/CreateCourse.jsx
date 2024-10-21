import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCourse } from "../features/createCourseSlice";
import { Toaster, toast } from "react-hot-toast";
import Loader from "../components/Loader";

const CreateCourse = () => {
  const [keypoints, setKeypoints] = useState([""]);
  const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.createCourse);

  const handleKeypointChange = (index, value) => {
    const updatedKeypoints = [...keypoints];
    updatedKeypoints[index] = value;
    setKeypoints(updatedKeypoints);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData({
        ...data,
        image: file,
      });
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const addKeypoint = () => {
    setKeypoints([...keypoints, ""]);
  };

  const removeKeypoint = (index) => {
    const updatedKeypoints = keypoints.filter((_, i) => i !== index);
    setKeypoints(updatedKeypoints);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("courseImage", data.image);

    keypoints.forEach((point, index) => {
      formData.append(`keypoints[${index}]`, point);
    });

    dispatch(addCourse(formData))
      .unwrap()
      .then((result) => {
        console.log(result);
        navigate(`/course/${result.data._id}`);
        toast.success("Course created successfully", {
          position: "center",
          autoClose: 5000,
        });
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "center",
          autoClose: 5000,
        });
      });
  };

  return (
    <>
      <Toaster />
      {loading ? (
        <Loader />
      ) : (
        <div className="px-[5%] py-[2%] w-screen">
          <h1 className="text-center text-5xl">Create Course</h1>
          <div className="flex items-center flex-col mt-10">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-1/3 border border-zinc-800 rounded-md px-[2%] py-[3%] gap-4"
            >
              <div className="flex flex-col gap-2">
                <label>Course Title</label>
                <input
                  type="text"
                  className="w-full p-2 rounded-md text-black focus:outline-none"
                  onChange={handleChange}
                  name="title"
                  value={data.title}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Course Description</label>
                <input
                  type="text"
                  className="w-full p-2 rounded-md text-black focus:outline-none"
                  onChange={handleChange}
                  name="description"
                  value={data.description}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Course Price</label>
                <input
                  type="number"
                  className="w-full p-2 rounded-md text-black focus:outline-none"
                  onChange={handleChange}
                  name="price"
                  value={data.price}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Course Category</label>
                <input
                  type="text"
                  className="w-full p-2 rounded-md text-black focus:outline-none"
                  onChange={handleChange}
                  name="category"
                  value={data.category}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Course Image</label>
                <input
                  type="file"
                  className="bg-white w-full text-black p-2 rounded-md focus:outline-none file:bg-black file:text-white file:border-none file:rounded-full file:mr-3"
                  onChange={handleImageChange}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Key Points</label>
                {keypoints.map((keypoint, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={keypoint}
                      onChange={(e) =>
                        handleKeypointChange(index, e.target.value)
                      }
                      placeholder={`Keypoint ${index + 1}`}
                      className="w-full p-2 rounded-md text-black focus:outline-none"
                    />
                    {keypoints.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeKeypoint(index)}
                        className="px-3 py-1 text-white bg-red-500 rounded-md"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addKeypoint}
                  className="px-4 py-2 mt-2 border-zinc-800 border text-white rounded-md"
                >
                  Add Keypoint
                </button>
              </div>

              <button className="px-4 py-2 border border-zinc-800 rounded-md mt-3">
                Create Course
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateCourse;
