import { useDispatch, useSelector } from "react-redux";
import { updateTeam, deleteTeam } from "../../teams/TeamsThunk";

const TeamsCard = ({ team }) => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.teams);
  return (
    <div className="team-card">
      {error === "error_updated_team" && (
        <p className="team-error">Помилка редагування бригади</p>
      )}

      <div className="team-card-header">
        <h3 className="team-card-title">Бригада №{team.name}</h3>

        <span className={`team-status ${team.status}`}>
          {team.status === "available" ? "Вільна" : "Зайнята"}
        </span>
      </div>

      <p className="team-card-text">
        <span>Учасники:</span> {team.members}
      </p>

      <p className="team-card-text">
        <span>Телефон:</span> {team.phone}
      </p>

      <p className="team-card-text">
        <span>Район:</span> {team.district}
      </p>

      <div className="team-card-actions">
        {team.status === "available" && (
          <button
            className="team-card-button busy"
            onClick={() =>
              dispatch(updateTeam({ id: team.id, status: "busy" }))
            }
          >
            Зробити зайнятою
          </button>
        )}

        {team.status === "busy" && (
          <button
            className="team-card-button available"
            onClick={() =>
              dispatch(updateTeam({ id: team.id, status: "available" }))
            }
          >
            Зробити вільною
          </button>
        )}
        <button
          className="team-card-button delete"
          onClick={() => dispatch(deleteTeam({ id: team.id }))}
        >
          Видалити
        </button>
      </div>
    </div>
  );
};

export default TeamsCard;
