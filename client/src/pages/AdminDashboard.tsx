import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  studentId: string;
  email: string;
  role: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const token = localStorage.getItem('token');
    const res = await axios.get('/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(res.data);
  }

  async function promoteUser(userId: string) {
    const token = localStorage.getItem('token');
    await axios.post(`/api/admin/promote/${userId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchUsers(); // refresh after promotion
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border-b p-2">Name</th>
            <th className="border-b p-2">Student ID</th>
            <th className="border-b p-2">Email</th>
            <th className="border-b p-2">Role</th>
            <th className="border-b p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td className="border-b p-2">{user.name}</td>
              <td className="border-b p-2">{user.studentId}</td>
              <td className="border-b p-2">{user.email}</td>
              <td className="border-b p-2">{user.role}</td>
              <td className="border-b p-2">
                {user.role !== 'admin' && (
                  <button
                    onClick={() => promoteUser(user._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded"
                  >
                    Promote to Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
