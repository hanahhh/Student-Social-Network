import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosConfig } from "../../configs/axiosConfig";

export const userLogin = createAsyncThunk(
  `user/login`,
  async (data, { rejectWithValue }) => {
    try {
      const axios = AxiosConfig();
      const res = await axios.post(
        `${process.env.REACT_APP_API}/auth/login`,
        data
      );
      localStorage.setItem(
        `${process.env.REACT_APP_PREFIX_LOCAL}_access_token`,
        res.data.data.access_token
      );
      localStorage.setItem(
        `${process.env.REACT_APP_PREFIX_LOCAL}_refresh_token`,
        res.data.data.refresh_token
      );
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
