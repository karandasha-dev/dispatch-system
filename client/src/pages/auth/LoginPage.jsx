import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../auth/authThunk";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    const result = await dispatch(loginUser(userData));
    if (loginUser.fulfilled.match(result)) {
      nav("/");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {loading && <p сlassName="login-loading">Завантаження...</p>}
        {error === "error_login_user" && (
          <p className="login-error">Помилка входу</p>
        )}
        {error === "error_fetch_current_user" && (
          <p className="login-error">Помилка отримання існуючого користувача</p>
        )}

        <div className="login-header">
          <h1 className="login-title">Увійти</h1>

          <p className="login-subtitle">
            Введіть свої дані для входу в систему
          </p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-group">
            <label>Email</label>

            <input
              className="login-input"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Введіть email"
              value={email}
            />
          </div>

          <div className="login-group">
            <label>Пароль</label>

            <input
              className="login-input"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Введіть пароль"
              value={password}
            />
          </div>

          <button className="login-button" disabled={loading} type="submit">
            Увійти
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
