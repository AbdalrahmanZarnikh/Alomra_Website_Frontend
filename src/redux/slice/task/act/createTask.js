import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../api/configAxios";
import toast from "react-hot-toast";
import { playSound } from "../../../../utils/playSound";

const createTask = createAsyncThunk(
  "tasks/createTask",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post("/api/tasks",data);
     
      toast.success("تم التسجيل بنجاح")
      playSound();

      return res.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  }
);

export default createTask;
