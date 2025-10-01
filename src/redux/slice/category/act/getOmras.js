import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../api/configAxios";

const getOmras = createAsyncThunk(
    "omras/getAll",
    async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await axios.get(
          "/api/omras"
        );

           return res.data.data;
        
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.response?.data.message);
        }
      }
    }
  );

  

  export default getOmras