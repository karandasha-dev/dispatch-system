import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../users/usersThunk";

const UsersForm = () => {
  const [formUser, setFormUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const { loading, error } = useSelector((state) => state.users);

  const handleChange = (e) => {
    setFormUser({
      ...formUser,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formUser.name.trim() ||
      !formUser.email.trim() ||
      !formUser.password.trim() ||
      !formUser.role.trim()
    ) {
      return;
    }
    dispatch(createUser(formUser));

    setFormUser({
      name: "",
      email: "",
      password: "",
      role: "",
    });
  };

  return (
    <div className="users-form-wrapper">
      <form className="users-form" onSubmit={handleSubmit} autoComplete="off">
        <h2 className="users-form-title">Новий користувач</h2>
        {loading && <p className="users-loading">Завантаження...</p>}
        {error === "error_add_user" && (
          <p className="users-error">Помилка додавання користвача</p>
        )}

        <div className="users-form-group">
          <label>Ім'я користувача</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            id="name"
            value={formUser.name}
          />
        </div>

        <div className="users-form-group">
          <label>Пошта користувача</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            value={formUser.email}
          />
        </div>

        <div className="users-form-group">
          <label>Пароль користувача</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
            value={formUser.password}
          />
        </div>

        <div className="users-form-group">
          <label>Роль</label>
          <select
            onChange={handleChange}
            name="role"
            id="role"
            value={formUser.role}
          >
            <option>Вибрати роль</option>
            <option value="admin">Адміністратор</option>
            <option value="dispatcher">Диспетчер</option>
            <option value="manager">Менеджер</option>
          </select>
        </div>

        <button className="save-button" type="submit" disabled={loading}>
          Зберегти дані
        </button>
      </form>
    </div>
  );
};

export default UsersForm;
