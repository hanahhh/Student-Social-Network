import { createSlice } from "@reduxjs/toolkit";
import { getAllTags } from "../action/tags";

const initialState = {
  status: 0,
  data: null,
  message: "",
};

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTags.pending, (state) => {
      state.message = "";
    });
    builder.addCase(getAllTags.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.data = action.payload.data.result;
      state.message = action.payload.message;
    });

    builder.addCase(getAllTags.rejected, (state, action) => {
      state.data = null;
      state.status = action.payload.status;
      state.message = action.payload.message;
    });
  },
});

const { reducer, actions } = tagSlice;

export default tagSlice.reducer;
