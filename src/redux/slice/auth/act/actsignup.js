import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../api/configAxios";
import toast from "react-hot-toast";

const signup = createAsyncThunk("auth/signup", async (data, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await axios.post(
      "/api/auth/signup",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast.success("تمت عملية انشاء حساب بنجاح");
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
  }
});

export default signup;
