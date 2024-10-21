import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:4000/api/courses";

const initialState = {
  allCourses: [],
  loading: false,
  error: null,
  singleCourse: null,
};

export const getAllCourses = createAsyncThunk(
  "/courses/courses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/courses`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getSinlgeCourse = createAsyncThunk(
  "/courses/course",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/courses/${courseId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.allCourses = action.payload;
        state.error = null;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.allCourses = [];
        state.error = action.payload;
      })
      .addCase(getSinlgeCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.singleCourse = null;
      })
      .addCase(getSinlgeCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.singleCourse = action.payload;
        state.error = null;
      })
      .addCase(getSinlgeCourse.rejected, (state, action) => {
        state.loading = false;
        state.singleCourse = null;
        state.error = action.payload;
      });
  },
});

const courseReducer = userSlice.reducer;
export default courseReducer;
