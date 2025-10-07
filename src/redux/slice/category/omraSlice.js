import { createSlice } from "@reduxjs/toolkit";

// Thunks
import addOmra from "./act/addOmra";
import getOmras from "./act/getOmras";
import deleteOmra from "./act/deleteOmra";
import updateOmra from "./act/updateOmra";

import toast from "react-hot-toast";

// State
const initialState = {
  omras: [],
  isLoading: "Idle",
  allFiles:[],
  files: [],
  error: null,
};

// Slice
const omraSlice = createSlice({
  name: "omra",
  initialState,
  reducers: {
    saveFiles: (state, action) => {
      state.allFiles = action.payload; // تخزين الملفات الأصلية
      state.files = action.payload; // عرض الملفات مباشرة
    },
    searchFile: (state, action) => {
      const query = action.payload.toLowerCase();
      if (!query) {
        state.files = state.allFiles; // إذا البحث فارغ، اعرض كل الملفات
      } else {
        state.files = state.allFiles.filter((f) =>
          f.name.toLowerCase().includes(query)
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOmras.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getOmras.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.omras = action.payload;
    });
    builder.addCase(getOmras.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload;
      toast.error(state.error || "Network Error");
    });
    builder.addCase(addOmra.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(addOmra.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.omras = [...state.omras, action.payload];
    });
    builder.addCase(addOmra.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload;
      toast.error(state.error || "Network Error");
    });
    builder.addCase(deleteOmra.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(deleteOmra.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.omras = state.omras.filter((item) => item._id !== action.payload);
    });
    builder.addCase(deleteOmra.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload;
      toast.error(state.error || "Network Error");
    });
    builder.addCase(updateOmra.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(updateOmra.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.omras = state.omras.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    });

    builder.addCase(updateOmra.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload;
      toast.error(state.error || "Network Error");
    });
  },
});

export default omraSlice.reducer;

export const { saveFiles, searchFile } = omraSlice.actions;

export { addOmra, getOmras, deleteOmra, updateOmra };
