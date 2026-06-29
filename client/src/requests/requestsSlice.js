import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRequests,
  createRequest,
  updateStatus,
  deleteRequest,
} from "./requestsThunk";

const initialState = {
  loading: false,
  error: null,
  list: [],
};

const requestsSlice = createSlice({
  name: "requests",
  initialState,

  reducers: {
    requestUpdatedRealTime: (state, action) => {
      state.list = state.list.map((request) =>
        request.id === action.payload.id ? action.payload : request,
      );
    },

    requestCreatedRealTime: (state, action) => {
      const exists = state.list.some(
        (request) => request.id === action.payload.id,
      );

      if (!exists) {
        state.list.push(action.payload);
      }
    },

    requestDeletedRealTime: (state, action) => {
      state.list = state.list.filter(
        (request) => request.id !== action.payload,
      );
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchRequests.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchRequests.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.list = action.payload;
    });
    builder.addCase(fetchRequests.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createRequest.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;

      const exists = state.list.some(
        (request) => request.id === action.payload.id,
      );

      if (!exists) {
        state.list.push(action.payload);
      }
    });
    builder.addCase(createRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      const updateRequest = action.payload;

      const index = state.list.findIndex(
        (request) => request.id === updateRequest.id,
      );

      if (index !== -1) {
        state.list[index] = updateRequest;
      }
    });
    builder.addCase(updateStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteRequest.pending, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteRequest.fulfilled, (state, action) => {
      state.loading = false;
      const id = action.payload;
      state.list = state.list.filter(
        (request) => request.id !== action.payload,
      );
    });
    builder.addCase(deleteRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  requestCreatedRealTime,
  requestUpdatedRealTime,
  requestDeletedRealTime,
} = requestsSlice.actions;
export default requestsSlice.reducer;
