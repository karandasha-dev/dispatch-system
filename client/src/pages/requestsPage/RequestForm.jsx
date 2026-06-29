import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRequest } from "../../requests/requestsThunk";

const RequestForm = ({ mapData }) => {
  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    address: "",
    serviceType: "",
    date: "",
    time: "",
    complexity: "",
    status: "new",
    teamId: "",
    comment: "",
    lat: "",
    lng: "",
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.requests);
  const { list: teams } = useSelector((state) => state.teams);

  useEffect(() => {
    if (mapData) {
      setFormData((prev) => ({
        ...prev,
        address: mapData.address || "",
        lat: mapData.lat || "",
        lng: mapData.lng || "",
      }));
    }
  }, [mapData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.clientName.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.serviceType.trim() ||
      !formData.date.trim() ||
      !formData.time.trim() ||
      !formData.complexity.trim() ||
      !formData.status.trim() ||
      !formData.teamId.trim()
    ) {
      return;
    }

    dispatch(createRequest(formData));
    setFormData({
      clientName: "",
      phone: "",
      address: "",
      serviceType: "",
      date: "",
      time: "",
      complexity: "",
      status: "new",
      teamId: "",
      comment: "",
      lat: mapData?.lat || "",
      lng: mapData?.lng || "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="request-form">
      {loading && <p className="request-message">Завантаження...</p>}
      {error === "error_add_request" && (
        <p className="request-error">Помилка додавання заявки</p>
      )}
      <form onSubmit={handleSubmit}>
        <h2 className="request-form-title">Додати заявку</h2>

        <div className="request-form-grid">
          <div className="request-form-group">
            <label htmlFor="clientName">Ім'я замовника</label>
            <input
              className="request-form-input"
              onChange={handleChange}
              type="text"
              name="clientName"
              id="name"
              value={formData.clientName}
            />
          </div>

          <div className="request-form-group">
            <label htmlFor="phone">Номер телефону</label>
            <input
              className="request-form-input"
              onChange={handleChange}
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
            />
          </div>

          <div className="request-form-group">
            <label htmlFor="address">Адреса</label>
            <input
              className="request-form-input"
              onChange={handleChange}
              type="text"
              name="address"
              id="address"
              value={formData.address}
            />
          </div>

          <div className="request-form-group">
            <label className="request-form-label" htmlFor="serviceType">
              Тип сервісу
            </label>
            <input
              className="request-form-input"
              onChange={handleChange}
              type="text"
              name="serviceType"
              id="serviceType"
              value={formData.serviceType}
            />
          </div>

          <div className="request-form-group">
            <label htmlFor="date">Дата</label>
            <input
              className="request-form-input"
              onChange={handleChange}
              type="date"
              name="date"
              id="date"
              value={formData.date}
            />
          </div>

          <div className="request-form-group">
            <label htmlFor="time">Час</label>
            <input
              className="request-form-input"
              onChange={handleChange}
              type="time"
              name="time"
              id="time"
              value={formData.time}
            />
          </div>

          <div className="request-form-group">
            <label htmlFor="complexity">Складність</label>
            <input
              className="request-form-input"
              onChange={handleChange}
              type="text"
              name="complexity"
              id="complexity"
              value={formData.complexity}
            />
          </div>

          <div>
            <label>Коментар клієнта</label>
            <textarea
              className="request-form-textarea"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Наприклад: подзвонити за 30 хвилин до приїзду"
            />
          </div>

          <div className="request-form-group">
            <label htmlFor="teamId">Бригада</label>
            <select
              className="request-form-input"
              id="teamId"
              name="teamId"
              value={formData.teamId}
              onChange={handleChange}
            >
              <option value="">Оберіть бригаду</option>

              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  Бригада № {team.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className="request-form-button">Зберегти заявку</button>
      </form>
    </div>
  );
};

export default RequestForm;
