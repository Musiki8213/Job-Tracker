import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "C:/Users/User/job-tracker/src/Context/AuthContext";
import Loader from "C:/Users/User/job-tracker/src/Components/Loader";

type User = { username: string; password: string };

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) return;
    setLoading(true);

    setTimeout(() => {
      const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
      const userExists = users.find(u => u.username === username && u.password === password);

      if (userExists) {
        login(username);
        navigate("/home");
      } else {
        alert("Invalid username or password");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div id="login-page" style={{ textAlign: "center", padding: "50px" }}>
      <h1 id="login-title">Login</h1>
      <input
        id="login-username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{ margin: "10px", padding: "10px" }}
      />
      <input
        id="login-password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ margin: "10px", padding: "10px" }}
      />
      <br />
      <button
        id="login-button"
        onClick={handleLogin}
        disabled={loading}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Login
        {loading && <Loader />}
      </button>
      <p>
        No account? <Link id="login-register-link" to="/register">Register</Link>
      </p>
    </div>
  );
}
