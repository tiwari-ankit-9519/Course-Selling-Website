import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:4000/api/";

const initialState = {
  error: null,
  loading: false,
  allLessons: [],
  singleLesson: {},
};

export const createLessons = createAsyncThunk(
  "lessons/createLesson",
  async ({ id, lessonData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}lessons/${id}`, lessonData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteLessons = createAsyncThunk(
  "/lessons/deleteLesson",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseUrl}lessons/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllLessons = createAsyncThunk(
  "lessons/getAllLessons",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}lessons/${id}`);
      return response.data.data;
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
      .addCase(createLessons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.allLessons.push(action.payload);
        state.error = null;
      })
      .addCase(createLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteLessons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.allLessons = state.allLessons.filter(
          (lesson) => lesson._id !== action.payload._id
        );
        state.error = null;
      })
      .addCase(deleteLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllLessons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.allLessons = action.payload;
        state.error = null;
      })
      .addCase(getAllLessons.rejected, (state, action) => {
        state.loading = false;
        state.allLessons = [];
        state.error = action.payload;
      });
  },
});

const lessonsReducer = lessonSlice.reducer;

export default lessonsReducer;
