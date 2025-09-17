import { createSlice } from "@reduxjs/toolkit";

// Thunks

import signup from "./act/actsignup";
import login from "./act/actlogin";
import forgotPassword from "./act/actforgotPassword";
import resetCode from "./act/actresetCode";
import resetPassword from "./act/actresetPassword";

import toast from "react-hot-toast";

// State
const initialState = {
  info: null,
  isLoading: "Idle",
  error: null,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      localStorage.setItem("token", action.payload.token);
      state.info = action.payload.data;
      localStorage.setItem("role", action.payload.data.role);
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload;
      toast.error(state.error || "Network Error");
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      localStorage.setItem("token", action.payload.token);
      state.info = action.payload.data;
      localStorage.setItem("role", action.payload.data.role);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload;
      toast.error(state.error || "Network Error");
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      localStorage.setItem("token", action.payload.token);
      state.info = action.payload.data;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload;
      toast.error(state.error || "Network Error");
    });
    builder.addCase(forgotPassword.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload;
      toast.error(state.error || "Network Error");
    });
    builder.addCase(resetCode.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(resetCode.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
    });
    builder.addCase(resetCode.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload;
      toast.error(state.error || "Network Error");
    });
  },
});

export default authSlice.reducer;

export { signup, login, resetCode, resetPassword, forgotPassword };
