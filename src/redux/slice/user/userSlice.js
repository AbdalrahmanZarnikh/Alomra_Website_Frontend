import { createSlice } from "@reduxjs/toolkit";

// Thunks

import createUser from "./act/createUser";
import getUsers from "./act/getUsers";
import deleteUser from "./act/deleteUser";
import updateUser from "./act/updateUser";
import getUsersBySearch from "./act/getUsersBySearch";

import toast from "react-hot-toast";

// State
const initialState = {
  data: [],
  isLoading: "Idle",
  error: null,
};

// Slice
const userSlice = createSlice({
  name: "user",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.data = [...state.data, action.payload];
    });

    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload;
      // toast.error(state.error || "Network Error");
    });
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload;
      toast.error(state.error || "Network Error");
    });
    builder.addCase(getUsersBySearch.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getUsersBySearch.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(getUsersBySearch.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload;
      toast.error(state.error || "Network Error");
    });
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.data = state.data.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    });

    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload;
      toast.error(state.error || "Network Error");
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.data = state.data.filter((item) => item._id !== action.payload);
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload;
      toast.error(state.error || "Network Error");
    });
  },
});

export default userSlice.reducer;

export { createUser, deleteUser, updateUser, getUsers };
