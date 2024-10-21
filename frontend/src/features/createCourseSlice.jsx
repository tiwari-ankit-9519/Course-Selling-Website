import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  error: null,
  loading: false,
  newCourse: {},
};

export const addCourse = createAsyncThunk(
  "/courses/addCourse",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/courses/create-course",
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const addCourseSlice = createSlice({
  name: "addCourse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.newCourse = action.payload;
        state.error = null;
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.newCourse = {};
      });
  },
});

const createCourseReducer = addCourseSlice.reducer;

export default createCourseReducer;
