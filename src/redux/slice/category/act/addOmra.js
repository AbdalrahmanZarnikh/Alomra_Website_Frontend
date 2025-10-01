import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../api/configAxios";

const addOmra = createAsyncThunk("omras/add", async (data, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await axios.post(`/api/omras`, data);

    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
  }
});

export default addOmra;
