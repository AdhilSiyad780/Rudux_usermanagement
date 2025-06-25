import React, { useEffect, useState } from 'react';
import api from '../features/auth/authAPI'

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({ username: '', email: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user.id);
    setFormData({ username: user.username, email: user.email });
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/admin/users/${editUser}`, formData);
      setEditUser(null);
      fetchUsers(); // refresh user list
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await api.delete(`/admin/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>ID</th><th>Username</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t">
              <td>{user.id}</td>
              <td>
                {editUser === user.id
                  ? <input value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} />
                  : user.username}
              </td>
              <td>
                {editUser === user.id
                  ? <input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  : user.email}
              </td>
              <td>
                {editUser === user.id ? (
                  <>
                    <button onClick={handleUpdate} className="text-blue-500 mr-2">Save</button>
                    <button onClick={() => setEditUser(null)} className="text-gray-500">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(user)} className="text-green-500 mr-2">Edit</button>
                    <button onClick={() => handleDelete(user.id)} className="text-red-500">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
