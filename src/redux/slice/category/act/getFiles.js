import { createAsyncThunk } from "@reduxjs/toolkit";
import { storage } from "../../../../utils/appwriteClient";
import toast from "react-hot-toast";
import { Query } from "appwrite";

const bucketId = "68e3f68b0010d81f0045";

const getFiles = createAsyncThunk(
  "omra/getFiles",
  async (_,{ rejectWithValue }) => {
    try {
      const response = await storage.listFiles(bucketId, [
        Query.limit(100),
        Query.offset(0),
      ]);
      console.log(response.files)
      return response.files;
    } catch (err) {
      console.error("خطأ عند جلب الملفات:", err);
      toast.error("حدث خطأ أثناء تحميل الملفات");
      return rejectWithValue(err.message);
    }
  }
);

export default getFiles;
