import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRequests, addRequests, editStatus, delRequest } from "../api/api";

export const fetchRequests = createAsyncThunk(
  "requests/fetchRequests",
  async (_, thunkAPI) => {
    try {
      const data = await getRequests();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("error_fetch_requests");
    }
  },
);

export const createRequest = createAsyncThunk(
  "requests/createRequests",
  async (newRequest, thunkAPI) => {
    try {
      const data = await addRequests(newRequest);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("error_add_request");
    }
  },
);

export const updateStatus = createAsyncThunk(
  "requests/updateStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const data = await editStatus(id, { status });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("error_edit_request");
    }
  },
);

export const deleteRequest = createAsyncThunk(
  "requests/deleteRequest",
  async (id, thunkAPI) => {
    try {
      await delRequest(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue("error_delete_request");
    }
  },
);
