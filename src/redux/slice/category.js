import { createSlice } from "@reduxjs/toolkit";
import { getAllCategory } from "../action/category";

const initialState = {
  status: 0,
  data: null,
  message: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategory.pending, (state) => {
      state.message = "";
    });
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.data = action.payload.data.result;
      state.message = action.payload.message;
    });

    builder.addCase(getAllCategory.rejected, (state, action) => {
      state.data = null;
      state.status = action.payload.status;
      state.message = action.payload.message;
    });
  },
});

const { reducer, actions } = categorySlice;

export default categorySlice.reducer;
