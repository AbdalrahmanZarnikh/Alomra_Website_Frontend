import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slice/user/userSlice";
import omraSlice from "./slice/category/omraSlice";

export const store = configureStore({
  reducer: {
    userSlice,
    omraSlice
  },
});
