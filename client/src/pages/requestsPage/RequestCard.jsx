import { useDispatch, useSelector } from "react-redux";
import { updateStatus, deleteRequest } from "../../requests/requestsThunk";
import { updateTeam } from "../../teams/TeamsThunk";

const RequestCard = ({ request, number }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.requests);
  const { list: teams } = useSelector((state) => state.teams);

  const handleStartWork = () => {
    const assignedTeam = teams.find(
      (team) => Number(team.id) === Number(request.teamId),
    );

    if (!assignedTeam) {
      alert("Бригада не знайдена або не призначена");
      return;
    }

    dispatch(updateStatus({ id: request.id, status: "in_progress" }));

    dispatch(
      updateTeam({
        ...assignedTeam,
        status: "busy",
      }),
    );
  };

  return (
    <div className="request-card">
      {loading && <p className="request-message">Завантаження...</p>}
      {error === "error_add_request" && (
        <p className="request-error">Помилка додавання заявки</p>
      )}
      {error === "error_edit_request" && (
        <p className="request-error">Помилка редагування статусу</p>
      )}
      <div className="request-card-header">
        <h3 className="request-card-title">Заявка №{number}</h3>

        <span className={`request-status ${request.status}`}>
          {request.status === "new" && "Нова"}
          {request.status === "assigned" && "Призначена"}
          {request.status === "in_progress" && "Виконується"}
          {request.status === "completed" && "Завершена"}
        </span>
      </div>

      <p className="request-card-text">
        <span className="label">Клієнт:</span> {request.clientName}
      </p>
      <p className="request-card-text">
        <span>Телефон:</span> {request.phone}
      </p>
      <p className="request-card-text">
        <span>Адреса:</span> {request.address}
      </p>
      <p className="request-card-text">
        <span>Послуга:</span> {request.serviceType}
      </p>

      <p className="request-card-text">
        <span>Дата:</span> {new Date(request.date).toLocaleDateString("uk-UA")}{" "}
        {""}
        {request.time}
      </p>

      <p className="request-card-text">
        <span>Складність:</span> {request.complexity}
      </p>

      <p className="request-card-text">
        <strong>Коментар:</strong> {request.comment || "Немає"}
      </p>

      <p>
        <span>Бригада:</span> {request.teamName || "Не призначена"}
      </p>

      <div className="request-card-actions">
        {request.status === "new" && (
          <button
            className="request-card-button progress"
            onClick={handleStartWork}
          >
            Взяти в роботу
          </button>
        )}

        {request.status === "in_progress" && (
          <button
            className="request-card-button complete"
            onClick={() =>
              dispatch(updateStatus({ id: request.id, status: "completed" }))
            }
          >
            Завершити
          </button>
        )}

        <button
          className="request-card-button delete"
          onClick={() => dispatch(deleteRequest(request.id))}
        >
          Видалити
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
