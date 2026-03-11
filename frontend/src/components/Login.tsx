import { useState } from "react";
import axios from "axios";

interface Props {
  onLogin: (token: string) => void;
}

export default function Login({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("/api/token/", { username, password });
      onLogin(res.data.access);
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div
      style={{ maxWidth: 400, margin: "100px auto", fontFamily: "sans-serif" }}
    >
      <h2>Employee Directory</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          marginBottom: 10,
          padding: 8,
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          marginBottom: 10,
          padding: 8,
        }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleLogin} style={{ padding: "8px 16px" }}>
        Log In
      </button>
    </div>
  );
}
