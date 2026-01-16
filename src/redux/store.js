import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slice/user/userSlice";
import omraSlice from "./slice/category/omraSlice";
import taskSlice from "./slice/task/taskSlice"

export const store = configureStore({
  reducer: {
    userSlice,
    omraSlice,
    taskSlice
  },
});
