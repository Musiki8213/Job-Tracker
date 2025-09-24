import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Loader from "C:/Users/User/job-tracker/src/pages/Registerpage/Register";

type User = { username: string; password: string };

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!username || !password) return;
    setLoading(true);

    setTimeout(() => {
      const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

      if (users.find(u => u.username === username)) {
        alert("Username already exists");
        setLoading(false);
        return;
      }

      users.push({ username, password });
      localStorage.setItem("users", JSON.stringify(users));
      setLoading(false);
      alert("Registered successfully! Please log in.");
      navigate("/login");
    }, 500);
  };

  return (
    <div id="register-page" style={{ textAlign: "center", padding: "50px" }}>
      <h1 id="register-title">Register</h1>
      <input
        id="register-username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{ margin: "10px", padding: "10px" }}
      />
      <input
        id="register-password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ margin: "10px", padding: "10px" }}
      />
      <br />
      <button
        id="register-button"
        onClick={handleRegister}
        disabled={loading}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Register
        {loading && <Loader />}
      </button>
      <p>
        Already have an account? <Link id="register-login-link" to="/login">Login</Link>
      </p>
    </div>
  );
}
