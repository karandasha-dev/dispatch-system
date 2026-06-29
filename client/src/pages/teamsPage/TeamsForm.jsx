import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTeam } from "../../teams/TeamsThunk";

const TeamsForm = () => {
  const [formTeam, setFormTeam] = useState({
    name: "",
    members: "",
    phone: "",
    district: "",
    status: "available",
  });

  const { loading, error } = useSelector((state) => state.teams);

  const handleChange = (e) => {
    setFormTeam({
      ...formTeam,
      [e.target.name]: e.target.value,
    });
  };
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formTeam.name.trim() ||
      !formTeam.members.trim() ||
      !formTeam.phone.trim() ||
      !formTeam.district.trim()
    ) {
      return;
    }
    dispatch(createTeam(formTeam));

    setFormTeam({
      name: "",
      members: "",
      phone: "",
      district: "",
      status: "available",
    });
  };

  return (
    <div className="team-form-wrapper">
      <form className="team-form" onSubmit={handleSubmit}>
        <h2 className="team-form-title">Додати бригаду</h2>
        {loading && <p className="team-message">Завантаження...</p>}
        {error === "error_add_team" && (
          <p className="team-error">Помилка додавання бригади</p>
        )}
        <div className="team-form-group">
          <label className="team-form-label">Номер бригади</label>
          <input
            className="team-form-input"
            name="name"
            id="name"
            value={formTeam.name}
            type="text"
            onChange={handleChange}
          />
        </div>

        <div className="team-form-group">
          <label className="team-form-label">Кількість працівників</label>
          <input
            className="team-form-input"
            name="members"
            id="members"
            value={formTeam.members}
            type="text"
            onChange={handleChange}
          />
        </div>

        <div className="team-form-group">
          <label className="team-form-label">Номер телефону</label>
          <input
            className="team-form-input"
            name="phone"
            id="phone"
            value={formTeam.phone}
            type="text"
            onChange={handleChange}
          />
        </div>

        <div className="team-form-group">
          <label className="team-form-label">Район</label>
          <input
            className="team-form-input"
            name="district"
            id="district"
            value={formTeam.district}
            type="text"
            onChange={handleChange}
          />
        </div>

        <div className="team-form-group">
          <label className="team-form-label">Статус</label>
          <select
            className="team-form-input"
            name="status"
            id="status"
            value={formTeam.status}
            onChange={handleChange}
          >
            <option value="available">Вільна</option>
            <option value="busy">Зайнята</option>
          </select>
        </div>
        
        <button className="team-form-button" type="submit" disabled={loading}>
          Зберегти дані
        </button>
      </form>
    </div>
  );
};

export default TeamsForm;
