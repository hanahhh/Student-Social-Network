import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosConfig } from "../../configs/axiosConfig";

export const getAllSubjects = createAsyncThunk(`subjects/all`, async () => {
  try {
    const axios = AxiosConfig();
    let api = "/subject";
    const res = await axios.get(api);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return error.message;
    }
  }
});
