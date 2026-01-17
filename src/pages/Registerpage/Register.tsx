import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContext } from "../../Context/ToastContext";
import Loader from "../../Components/Loader";
import './Register.css';

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!username.trim() || !password.trim()) {
      showToast("Please enter both username and password", "error");
      return;
    }

    if (password.length < 4) {
      showToast("Password must be at least 4 characters", "error");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      if (users.find((u: { username: string }) => u.username === username)) {
        showToast("Username already exists", "error");
        setLoading(false);
        return;
      }

      users.push({ username, password });
      localStorage.setItem("users", JSON.stringify(users));
      setLoading(false);
      showToast("Registration successful! Please log in.", "success");
      navigate("/login");
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  return (
    <section id="RegisterSec">
      <div id="register-page">
        <h1 id="register-title">Register</h1>
        <div className="register-form">
          <input
            id="register-username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <input
            id="register-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            id="register-button"
            onClick={handleRegister}
            disabled={loading}
          >
            Register
            {loading && <Loader />}
          </button>
        </div>
        <p className="auth-link-text">
          Already have an account? <Link id="register-login-link" to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}
