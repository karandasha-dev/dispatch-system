import { configureStore } from "@reduxjs/toolkit";
import requestsReducer from "../requests/requestsSlice";
import teamsReducer from "../teams/TeamsSlice";
import authReducer from "../auth/authSlice";
import usersReducer from "../users/usersSlice";

export const store = configureStore({
  reducer: {
    requests: requestsReducer,
    teams: teamsReducer,
    auth: authReducer,
    users: usersReducer,
  },
});
