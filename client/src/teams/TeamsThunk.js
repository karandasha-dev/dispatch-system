import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTeam, updTeam, getTeams, delTeam } from "../api/api";

export const fetchTeams = createAsyncThunk(
  "teams/fetchTeams",
  async (_, thunkAPI) => {
    try {
      const data = await getTeams();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("error_fetch_teams");
    }
  },
);

export const updateTeam = createAsyncThunk(
  "teams/updateTeam",
  async (updatedTeam, thunkAPI) => {
    try {
      const id = updatedTeam.id;

      const teamData = {
        name: updatedTeam.name,
        members: updatedTeam.members,
        phone: updatedTeam.phone,
        district: updatedTeam.district,
        status: updatedTeam.status,
      };

      const data = await updTeam(id, teamData);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("error_updated_team");
    }
  },
);

export const createTeam = createAsyncThunk(
  "teams/createTeam",
  async (newTeam, thunkAPI) => {
    try {
      const data = await addTeam(newTeam);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("error_add_team");
    }
  },
);

export const deleteTeam = createAsyncThunk(
  "teams/deleteTeam",
  async ({ id }, thunkAPI) => {
    try {
      await delTeam(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue("error_delete_team");
    }
  },
);
