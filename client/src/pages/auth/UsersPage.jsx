import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../users/usersThunk";
import UsersForm from "./UsersForm";
import UsersCard from "./UsersCard";

const UsersPage = () => {
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, list } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="users-page">
      <div className="users-page-header">
        <h1 className="users-page-title">Управління користувачами</h1>
        <p className="users-page-subtitle">
          Додавання, редагування та видалення користувачів системи
        </p>
      </div>

      <button
        className="add-user-button"
        onClick={() => setIsUserFormOpen(!isUserFormOpen)}
      >
        {isUserFormOpen ? "Закрити форму" : "Додати користувача"}
      </button>

      {loading && <p className="users-loading">Завантаження...</p>}
      {error === "error_fetch_users" && (
        <p className="users-error">Помилка завантаження користувачів</p>
      )}

      {isUserFormOpen && <UsersForm />}

      <div className="users-list">
        {list.map((user) => (
          <UsersCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
export default UsersPage;
