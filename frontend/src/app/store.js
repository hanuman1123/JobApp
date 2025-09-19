import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import postReducer from "../features/posts/postSlice";
import connectionReducer from "../features/connections/connectionSlice";
import businessReducer from "../features/business/businessServices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    connections: connectionReducer,
    business: businessReducer,
  },
});
