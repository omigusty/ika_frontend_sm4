import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProtectedAdmin from "./ProtectedAdmin";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setloggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const { message } = await response.json();
        setError(message);
        return;
      }

      const { token } = await response.json();
      localStorage.setItem("token", token);

      setloggedIn(true);
      navigate("/login/admin");
    } catch (error) {
      setError("Terjadi kesalahan saat login");
      console.error("Login error:", error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <div>{error}</div>}
      {loggedIn ? (
        <ProtectedAdmin />
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      )}
    </div>
  );
}
