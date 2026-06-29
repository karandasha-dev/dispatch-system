import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaClipboardList,
  FaPlusCircle,
  FaClock,
  FaCheckCircle,
  FaUsers,
  FaUserCheck,
} from "react-icons/fa";

const StatisticsCards = () => {
  const { list: requests, error: requestsError } = useSelector(
    (state) => state.requests,
  );
  const { list: teams, error: teamsError } = useSelector(
    (state) => state.teams,
  );

  const totalRequests = requests.length;

  const newRequests = requests.filter(
    (request) => request.status === "new",
  ).length;

  const inProgressRequests = requests.filter(
    (request) => request.status === "in_progress",
  ).length;

  const completedRequests = requests.filter(
    (request) => request.status === "completed",
  ).length;

  const availableTeams = teams.filter(
    (team) => team.status === "available",
  ).length;

  const busyTeams = teams.filter((team) => team.status === "busy").length;

  return (
    <div className="stats-page ">
      <div className="stats-header">
        <h1>Головна статистика</h1>
        <p> Загальний огляд заявок та роботи мобільних бригад</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card blue">
          <FaClipboardList className="stat-icon" />
          <h3>Всього заявок</h3>
          <p>{totalRequests}</p>
        </div>

        <div className="stat-card light-blue">
          <FaPlusCircle className="stat-icon" />
          <h3>Нові заявки</h3>
          <p>{newRequests}</p>
        </div>

        <div className="stat-card orange">
          <FaClock className="stat-icon" />
          <h3>В роботі</h3>
          <p>{inProgressRequests}</p>
        </div>

        <div className="stat-card green">
          <FaCheckCircle className="stat-icon" />
          <h3>Завершені</h3>
          <p>{completedRequests}</p>
        </div>

        <div className="stat-card dark-green">
          <FaUsers className="stat-icon" />
          <h3>Вільні бригади</h3>
          <p>{availableTeams}</p>
        </div>

        <div className="stat-card red">
          <FaUserCheck className="stat-icon" />
          <h3>Зайняті бригади</h3>
          <p>{busyTeams}</p>
        </div>
      </div>

      <div className="stats-system-card">
        {!requestsError && !teamsError ? (
          <p>Система працює стабільно</p>
        ) : (
          <p>В системі щось пішло не так</p>
        )}
        <p>
          Є {inProgressRequests} активні заявки та {availableTeams} доступні
          бригади.
        </p>
      </div>

      <div className="stats-actions">
        <Link className="stats-link" to="/requests">
          Перейти до заявок
        </Link>
        <Link className="stats-link" to="/teams">
          Перейти до бригад
        </Link>
        <Link className="stats-link" to="/map">
          Відкрити карту
        </Link>
        <Link className="stats-link" to="/reports">
          Переглянути звіти
        </Link>
      </div>
    </div>
  );
};

export default StatisticsCards;
