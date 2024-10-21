import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:4000/api/";

const initialState = {
  error: null,
  loading: false,
  allLessons: [],
  singleLesson: {},
};

export const getAllLessons = createAsyncThunk(
  "/lessons/getAllLessons",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/lessons`, id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const lessonSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLessons.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.allLessons = action.payload;
      })
      .addCase(getAllLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const lessonsReducer = lessonSlice.reducer;

export default lessonsReducer;
