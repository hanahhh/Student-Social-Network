import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../action/auth";

const initialState = {
  status: 0,
  data:
    JSON.parse(
      localStorage.getItem(`${process.env.REACT_APP_PREFIX_LOCAL}_user`)
    ) || null,
  message: "",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = 1;
      state.message = "Logout successful";
      state.data = null;
      localStorage.removeItem(`${process.env.REACT_APP_PREFIX_LOCAL}_user`);
      localStorage.removeItem(
        `${process.env.REACT_APP_PREFIX_LOCAL}_access_token`
      );
      localStorage.removeItem(
        `${process.env.REACT_APP_PREFIX_LOCAL}_refresh_token`
      );
      window.location.href = "/login";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.message = "";
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      const userData = {
        name: action.payload.data.user_info.name,
        role: action.payload.data.user_info.role,
        email: action.payload.data.user_info.phone,
        avatar: action.payload.data.user_info.avatar,
        educationStatus: action.payload.data.user_info.educationStatus,
        cpa: action.payload.data.user_info.cpa,
        _id: action.payload.data.user_info._id,
      };
      state.status = action.payload.status;
      state.data = userData;
      state.message = action.payload.message;
    });

    builder.addCase(userLogin.rejected, (state, action) => {
      state.data = null;
      state.status = action.payload.status;
      state.message = action.payload.message;
    });
  },
});

const { actions } = authSlice;

export const { logout } = actions;

export default authSlice.reducer;
