import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:4000/api/users";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "/user/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/register`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "/user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/login`, data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const useSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
    },
  },
  extraReducers: (builderCase) => {
    builderCase
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const userReducer = useSlice.reducer;

export const { logout } = useSlice.actions;
export default userReducer;
