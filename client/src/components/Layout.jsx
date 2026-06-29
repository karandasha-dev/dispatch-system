import { Outlet, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../auth/authSlice";
import { useEffect } from "react";
import { socket } from "../socket";
import {
  requestUpdatedRealTime,
  requestCreatedRealTime,
  requestDeletedRealTime,
} from "../requests/requestsSlice";
import {
  teamUpdatedRealTime,
  teamCreatedRealTime,
  teamDeletedRealTime,
} from "../teams/TeamsSlice";

const Layout = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    socket.on("requestUpdated", (updatedRequest) => {
      dispatch(requestUpdatedRealTime(updatedRequest));
    });

    socket.on("requestCreated", (newRequest) => {
      dispatch(requestCreatedRealTime(newRequest));
    });

    socket.on("requestDeleted", (deletedRequest) => {
      dispatch(requestDeletedRealTime(deletedRequest));
    });

    socket.on("teamUpdated", (updatedTeam) => {
      dispatch(teamUpdatedRealTime(updatedTeam));
    });

    socket.on("teamCreated", (newTeam) => {
      dispatch(teamCreatedRealTime(newTeam));
    });

    socket.on("teamDeleted", (deletedTeam) => {
      dispatch(teamDeletedRealTime(deletedTeam));
    });

    return () => {
      socket.off("requestUpdated");
      socket.off("requestCreated");
      socket.off("requestDeleted");
      socket.off("teamUpdated");
      socket.off("teamCreated");
      socket.off("teamDeleted");
    };
  }, [dispatch]);

  return (
    <div>
      <header>
        <nav>
          {["admin", "dispatcher", "manager"].includes(user?.role) && (
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/"
            >
              Головна статистика
            </NavLink>
          )}

          {["admin", "dispatcher"].includes(user?.role) && (
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/teams"
            >
              Список бригад
            </NavLink>
          )}

          {["admin", "dispatcher"].includes(user?.role) && (
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/requests"
            >
              Список заявок
            </NavLink>
          )}

          {["admin", "dispatcher", "manager"].includes(user?.role) && (
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/map"
            >
              Карта
            </NavLink>
          )}

          {["admin", "manager"].includes(user?.role) && (
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/reports"
            >
              Звіти
            </NavLink>
          )}

          {user?.role === "admin" && (
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/users"
            >
              Користувачі
            </NavLink>
          )}
          {["admin", "manager", "dispatcher"].includes(user?.role) && (
            <button onClick={handleLogout}>Вийти</button>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
