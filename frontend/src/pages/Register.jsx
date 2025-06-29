import { useState } from "react";
import { register } from "../features/auth/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import './login.css'; // CSS file import

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "", email: "" });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous error
    try {
      const result = await dispatch(register(form));
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Register</h2>
     <label>Username</label>
      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <label>Password</label>
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <label >Email</label>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      {error && <p className="error">{error}</p>}

      <button type="submit">Register</button>
    </form>
  );
}
