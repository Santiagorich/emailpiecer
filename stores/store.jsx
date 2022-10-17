
import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./slices/mainslice";
export default configureStore({
  reducer: {
    mainSlice,
  },
});
