import { createSlice } from "@reduxjs/toolkit";
import { getAllSchool } from "../action/school";

const initialState = {
  status: 0,
  data: null,
  message: "",
};

const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllSchool.pending, (state) => {
      state.message = "";
    });
    builder.addCase(getAllSchool.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.data = action.payload.data.result;
      state.message = action.payload.message;
    });

    builder.addCase(getAllSchool.rejected, (state, action) => {
      state.data = null;
      state.status = action.payload.status;
      state.message = action.payload.message;
    });
  },
});

const { reducer, actions } = schoolSlice;

export default schoolSlice.reducer;
