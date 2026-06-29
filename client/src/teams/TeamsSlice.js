import { createSlice } from "@reduxjs/toolkit";
import { fetchTeams, updateTeam, createTeam, deleteTeam } from "./TeamsThunk";

const initialState = {
  loading: false,
  error: null,
  list: [],
};

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    teamUpdatedRealTime: (state, action) => {
      state.list = state.list.map((team) =>
        team.id === action.payload.id ? action.payload : team,
      );
    },

    teamCreatedRealTime: (state, action) => {
      const exists = state.list.some((team) => team.id === action.payload.id);

      if (!exists) {
        state.list.push(action.payload);
      }
    },

    teamDeletedRealTime: (state, action) => {
      state.list = state.list.filter((team) => team.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTeams.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTeams.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.list = action.payload;
    });
    builder.addCase(fetchTeams.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateTeam.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateTeam.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;

      const updatedTeam = action.payload;

      state.list = state.list.map((team) =>
        team.id === updatedTeam.id ? updatedTeam : team,
      );
    });
    builder.addCase(updateTeam.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createTeam.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTeam.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;

      const exists = state.list.some((team) => team.id === action.payload.id);

      if (!exists) {
        state.list.push(action.payload);
      }
    });
    builder.addCase(createTeam.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteTeam.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteTeam.fulfilled, (state, action) => {
      state.loading = false;
      const id = action.payload;
      state.list = state.list.filter((team) => team.id !== action.payload);
    });
    builder.addCase(deleteTeam.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { teamCreatedRealTime, teamUpdatedRealTime, teamDeletedRealTime } =
  teamsSlice.actions;
export default teamsSlice.reducer;
