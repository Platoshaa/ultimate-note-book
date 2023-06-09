import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import articleSlice from "./slices/articleSlice";
import bookmarkSlice from "./slices/bookmarkSlice";
export default configureStore({
  reducer: {
    auth: authSlice,
    bookmark: bookmarkSlice,
    article: articleSlice,
  },
});
