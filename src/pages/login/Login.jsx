import React, { useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ new state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ start loading
    setError(null);
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      console.log("this ran well");
      console.log(res);
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    } finally {
      setLoading(false); // ✅ stop loading whether success or fail
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Welcome Back! Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="johndoe"
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading} // optional: prevent editing while loading
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"} {/* ✅ dynamic text */}
        </button>

        {error && <span className="spantext">{error}</span>}
      </form>
    </div>
  );
}

export default Login;
