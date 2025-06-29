import { useEffect, useState } from 'react';
import api from '../features/auth/authAPI';
import './admindashboard.css';
import { toast } from 'react-toastify';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ username: '', email: '' });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
  
  const fetchUsers = async () => {
    try {
      const res = await api.get(`admin/users/?search=${search}`);
      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

 useEffect(() => {
  const timeout = setTimeout(() => {
    fetchUsers();
  }, 300); // 300ms debounce

  return () => clearTimeout(timeout);
}, [search]);


  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditForm({ username: user.username, email: user.email });
  };

  const handleEditSubmit = async () => {
    try {
      await api.put(`admin/users/${editingUser}/`, editForm);
      toast.success("User updated successfully");
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`admin/users/${id}/`);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleCreate = async () => {
    if (!newUser.username || !newUser.email || !newUser.password) {
      return toast.warning("All fields are required");
    }
    try {
      await api.post('register/', newUser);
      toast.success("User created successfully");
      setNewUser({ username: '', email: '', password: '' });
      setShowCreateForm(false);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to create user");
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
         <button className="create-btn" onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Cancel' : '+ Create User'}
        </button>        {showCreateForm && (
        <div className="create-form">
          <input
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          />
          <input
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <button onClick={handleCreate} className="save-btn">Create</button>
        </div>
      )}
      </div>

      <input
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {users.map((u) => (
          <li key={u.id} className="user-item">
            {editingUser === u.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) =>
                    setEditForm({ ...editForm, username: e.target.value })
                  }
                />
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                />
                <button onClick={handleEditSubmit} className="save-btn">Save</button>
                <button onClick={() => setEditingUser(null)} className="cancel-btn">Cancel</button>
              </div>
            ) : (
              <>
                <div>
                  <strong>{u.username}</strong> – {u.email}
                </div>
                <div className="action-buttons">
                  <button onClick={() => handleEdit(u)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(u.id)} className="delete-btn">Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
