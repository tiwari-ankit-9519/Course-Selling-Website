import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice.jsx";
import courseReducer from "../features/courseSlice.jsx";
import { persistReducer } from "redux-persist";
import persistConfig from "../utils/persistConfig.js";
import createCourseReducer from "../features/createCourseSlice.jsx";
import lessonsReducer from "../features/lessonSlice.jsx";

const rootReducer = combineReducers({
  user: userReducer,
  courses: courseReducer,
  createCourse: createCourseReducer,
  lessons: lessonsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export default store;
