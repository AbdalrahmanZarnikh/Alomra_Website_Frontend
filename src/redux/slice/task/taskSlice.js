import { createSlice } from "@reduxjs/toolkit";

// Thunks

import createTask from "./act/createTask";
import getTasks from "./act/getTasks";
import deleteTask from "./act/deleteTask";
import updateTask from "./act/updateTask";

import toast from "react-hot-toast";

// State
const initialState = {
  data: [],
  isLoading: "Idle",
  error: null,
};

// Slice
const taskSlice = createSlice({
  name: "user",
  reducers: {
  },
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createTask.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.data = [...state.data, action.payload];
    });

    builder.addCase(createTask.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload;
      // toast.error(state.error || "Network Error");
    });
    builder.addCase(getTasks.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload;
      toast.error(state.error || "Network Error");
    });
    builder.addCase(updateTask.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.data = state.data.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    });

    builder.addCase(updateTask.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload;
      toast.error(state.error || "Network Error");
    });
    builder.addCase(deleteTask.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.data = state.data.filter((item) => item._id !== action.payload);
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload;
      toast.error(state.error || "Network Error");
    });
  },
});

export default taskSlice.reducer;

 
export { createTask, deleteTask, updateTask, getTasks };
