import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import dataSlice from "./slices/dataSlice";
import timerSlice from "./slices/timerSlice";
export default configureStore({
  reducer: {
    auth: authSlice,
    data: dataSlice,
    timer: timerSlice,
  },
});
