import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { ToastContext } from "../../Context/ToastContext";
import Loader from "../../Components/Loader";
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      showToast("Please enter both username and password", "error");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userExists = users.find((u: { username: string; password: string }) => 
        u.username === username && u.password === password
      );

      if (userExists) {
        login(username);
        showToast("Welcome back!", "success");
        navigate("/home");
      } else {
        showToast("Invalid username or password", "error");
      }
      setLoading(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <section id="loginSec">
      <div id="login-page">
        <h1 id="login-title">Login</h1>
        <div className="login-form">
          <input
            id="login-username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <input
            id="login-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            id="login-button"
            onClick={handleLogin}
            disabled={loading}
          >
            Login
            {loading && <Loader />}
          </button>
        </div>
        <p className="auth-link-text">
          No account? <Link id="login-register-link" to="/register">Register</Link>
        </p>
      </div>
    </section>
  );
}
