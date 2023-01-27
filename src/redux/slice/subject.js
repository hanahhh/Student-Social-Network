import { createSlice } from "@reduxjs/toolkit";
import { getAllSubjects, getTopSubject } from "../action/subject";

const initialState = {
  status: 0,
  data: null,
  top: null,
  message: "",
};

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllSubjects.pending, (state) => {
      state.message = "";
    });
    builder.addCase(getAllSubjects.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.data = action.payload.data.result;
      state.message = action.payload.message;
    });

    builder.addCase(getAllSubjects.rejected, (state, action) => {
      state.data = null;
      state.status = action.payload.status;
      state.message = action.payload.message;
    });

    builder.addCase(getTopSubject.pending, (state) => {
      state.message = "";
    });
    builder.addCase(getTopSubject.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.top = action.payload.data.result;
      state.message = action.payload.message;
    });

    builder.addCase(getTopSubject.rejected, (state, action) => {
      state.top = null;
      state.status = action.payload.status;
      state.message = action.payload.message;
    });
  },
});

const { reducer, actions } = subjectSlice;

export default subjectSlice.reducer;
