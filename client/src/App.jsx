import { Routes, Route } from "react-router-dom";
import StatisticsPage from "./pages/statisticsPage/StatisticsPage";
import RequestsPage from "./pages/requestsPage/RequestsPage";
import TeamsPage from "./pages/teamsPage/TeamsPage";
import MapPage from "./pages/mapPage/MapPage";
import ReportPage from "./pages/reportPage/ReportPage";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/auth/LoginPage";
import UsersPage from "./pages/auth/UsersPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "./auth/authThunk";
import { setAuthChecked } from "./auth/authSlice";
import "./App.css";
import "leaflet/dist/leaflet.css";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    } else {
      dispatch(setAuthChecked());
    }
  }, [dispatch, token]);

  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute allowedRoles={["admin", "dispatcher", "manager"]}>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<StatisticsPage />} />
        <Route path="requests" element={<RequestsPage />} />
        <Route
          path="teams"
          element={
            <PrivateRoute allowedRoles={["admin", "dispatcher"]}>
              <TeamsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="map"
          element={
            <PrivateRoute allowedRoles={["admin", "dispatcher", "manager"]}>
              <MapPage />
            </PrivateRoute>
          }
        />

        <Route
          path="users"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <UsersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="reports"
          element={
            <PrivateRoute allowedRoles={["admin", "manager"]}>
              <ReportPage />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
