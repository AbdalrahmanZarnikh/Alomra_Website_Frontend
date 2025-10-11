import { createAsyncThunk } from "@reduxjs/toolkit";
import { storage } from "../../../../utils/appwriteClient";
import toast from "react-hot-toast";

const bucketId = "68e3f68b0010d81f0045";

const deleteFile = createAsyncThunk(
  "omra/deleteFile",
  async (fileId, { rejectWithValue }) => {
    try {
      await storage.deleteFile(bucketId, fileId);
      return fileId;
    } catch (err) {
      if (err.message.includes("File not found")) {
        toast.error("الملف غير موجود في التخزين");
      } else {
        toast.error("حدث خطأ أثناء حذف الملف");
      }
      return rejectWithValue(err.message);
    }
  }
);

export default deleteFile;
