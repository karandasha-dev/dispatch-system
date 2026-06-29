import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTeams } from "../../teams/TeamsThunk";
import TeamsCard from "./TeamsCard";
import TeamsForm from "./TeamsForm";

const TeamsPage = () => {
  const [isTeamFormOpen, setIsTeamFormOpen] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, list } = useSelector((state) => state.teams);
  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  return (
    <div className="teams-page">
      <div className="teams-header">
        <h1 className="teams-title">Управління бригадами</h1>
        <p className="teams-subtitle">
          Перегляд, додавання та зміна статусу мобільних бригад
        </p>
      </div>

      <button
        onClick={() => setIsTeamFormOpen(!isTeamFormOpen)}
        className="teams-add-button"
      >
        {isTeamFormOpen ? "Закрити форму" : "Додати бригаду"}
      </button>

      {loading && <p className="team-message">Завантаження...</p>}
      {error === "error_fetch_teams" && (
        <p className="team-error">Помилка завантаження бригад</p>
      )}

      {isTeamFormOpen && <TeamsForm />}

      <div className="teams-list">
        {list.map((team) => (
          <TeamsCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;
