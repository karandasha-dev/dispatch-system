import { createSlice } from "@reduxjs/toolkit";
import { loginUser, fetchCurrentUser, changePasswordUser } from "./authThunk";

const token = localStorage.getItem("token");
const savedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: savedUser,
  token: token,
  isAuth: !!token,
  loading: false,
  error: null,
  list: [],
  authChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    setAuthChecked: (state) => {
      state.authChecked = true;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
      state.isAuth = true;
      state.token = action.payload.token;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuth = false;
    });
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.authChecked = false;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;

      state.user = action.payload;
      state.isAuth = true;
      state.authChecked = true;

      localStorage.setItem("user", JSON.stringify(action.payload));
    });
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuth = false;
      state.authChecked = true;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    });
    builder.addCase(changePasswordUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(changePasswordUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
      state.isAuth = true;

      localStorage.setItem("user", JSON.stringify(action.payload));
    });
    builder.addCase(changePasswordUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
export const { logout, setAuthChecked } = authSlice.actions;
