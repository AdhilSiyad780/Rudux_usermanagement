import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/AuthSlice';
import { toast } from 'react-toastify';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome To Home!</h1>

        <Link to="/profile">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg mb-4">
            Go to Profile
          </button>
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
