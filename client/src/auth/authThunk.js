import { createAsyncThunk } from "@reduxjs/toolkit";
import { logUser, getMe, changePassword } from "../api/api";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const data = await logUser(userData);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("error_login_user");
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/getMe",
  async (_, thunkAPI) => {
    try {
      const data = await getMe();
      return data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue("error_fetch_current_user");
    }
  },
);

export const changePasswordUser = createAsyncThunk(
  "auth/",
  async (passwordData, thunkAPI) => {
    try {
      const data = await changePassword(passwordData);
      return data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue("error_change_password");
    }
  },
);
