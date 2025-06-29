import { useState } from "react";
import { login } from '../features/auth/AuthSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './login.css';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(login(form));

    if (result.meta.requestStatus === "fulfilled") {
      const isAdmin = result.payload?.is_superuser;
      // ✅ route immediately using returned value
      if (isAdmin) {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } else {
         toast.error("Login failed. Please check your credentials.");
 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <label>Username</label>
      <input
        type="text"
        className="border w-full p-2 my-2"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />

      <label>Password</label>
      <input
        type="password"
        className="border w-full p-2 my-2"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />


      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  );
}
