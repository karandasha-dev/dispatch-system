import { useDispatch, useSelector } from "react-redux";
import { updateUser, deleteUser } from "../../users/usersThunk";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UsersCard = ({ user }) => {
  const [isEditing, setisEditing] = useState(false);
  const [editFormUser, setEditFormUser] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    password: "",
  });

  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEditFormUser({
      ...editFormUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUser({ id: user.id, ...editFormUser }));
    setisEditing(false);
  };

  return (
    <div className="users-card">
      {error === "error_updated_user" && (
        <p className="users-error">Помилка редагування користувача</p>
      )}
      {error === "error_delete_user" && (
        <p className="users-error">Помилка видалення користувача</p>
      )}
      {loading && <p className="users-loading">Завантаження...</p>}

      {!isEditing ? (
        <div className="users-card-content">
          <div className="users-card-header">
            <h3 className="users-card-title">{user.name}</h3>

            <span className="users-role">{user.role}</span>
          </div>

          <div className="users-info">
            <p className="users-info-item">
              <span>Email:</span> {user.email}
            </p>
          </div>

          <div className="users-actions">
            <button
              className="edit-button"
              onClick={() => setisEditing(!isEditing)}
            >
              Редагувати
            </button>
            <button
              className="delete-button"
              onClick={() => dispatch(deleteUser({ id: user.id }))}
            >
              Видалити
            </button>
          </div>
        </div>
      ) : (
        <form className="edit-form" onSubmit={handleSubmit}>
          <input
            className="edit-input"
            onChange={handleChange}
            name="name"
            value={editFormUser.name}
            placeholder="Ім'я"
          />
          <input
            className="edit-input"
            onChange={handleChange}
            name="email"
            value={editFormUser.email}
            placeholder="Email"
          />
          <select
            className="edit-select"
            onChange={handleChange}
            name="role"
            value={editFormUser.role}
          >
            <option value="admin">Адміністратор</option>
            <option value="dispatcher">Диспетчер</option>
            <option value="manager">Менеджер</option>
          </select>
          <input
            type="password"
            className="edit-input"
            onChange={handleChange}
            name="password"
            value={editFormUser.password}
            placeholder="Новий пароль"
          />
          <button className="save-button" type="submit" disabled={loading}>
            Зберегти
          </button>

          <button
            type="button"
            className="cancel-button"
            onClick={() => setisEditing(false)}
          >
            Скасувати
          </button>
        </form>
      )}
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Назад
      </button>
    </div>
  );
};

export default UsersCard;
