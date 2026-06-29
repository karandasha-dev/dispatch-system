import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, delUser, updUser, addUser } from "../api/api";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const data = await getUsers();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("error_fetch_users");
    }
  },
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (newUser, thunkAPI) => {
    try {
      const data = await addUser(newUser);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("error_add_user");
    }
  },
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (updatedUser, thunkAPI) => {
    try {
      const id = updatedUser.id;

      const userData = {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        password: updatedUser.password,
      };

      const data = await updUser(id, userData);
      return data;
    } catch (error) {
      console.log(error);
      console.log(error.message);
      console.log(error.response?.status);
      console.log(error.response?.data);
      return thunkAPI.rejectWithValue("error_updated_user");
    }
  },
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({ id }, thunkAPI) => {
    try {
      await delUser(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue("error_delete_user");
    }
  },
);
