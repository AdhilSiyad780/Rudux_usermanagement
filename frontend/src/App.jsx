import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Admindashboard from './pages/Admindashboard';
import Home from './pages/Home';
import ProtectedRoute from './protectedroute/ProtectedRoute'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-Dashboard"
        element={
          <ProtectedRoute requireAdmin={true}>
            <Admindashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
    <ToastContainer />

    </>
    
  );
}

export default App;
