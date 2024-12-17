import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/api'; 
import { useLocation } from 'react-router-dom';

const UserList = () => {
  const location = useLocation();
  const role = location.state?.role;  // Retrieve role from the state passed via Link

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await API.get('/user/all-users');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await API.delete(`/user/delete-user/${id}`);
        fetchUsers(); // Refresh user list
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/update-user/${id}`);
  };

  const handleAddUser = () => {
    navigate('/adduserform'); // Change the URL to the UserForm page
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
  {/* Title Section */}
  <h2 className="text-2xl font-bold text-center mt-32">User List</h2>

  {/* Table Section */}
  <div className="text-center mt-4">
    <div className="flex justify-center">
      <table className="table-auto w-[900px] border border-black">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-4 py-2 border border-gray-300">Name</th>
            <th className="px-4 py-2 border border-gray-300">Email</th>
            <th className="px-4 py-2 border border-gray-300">Role</th>
            <th className="px-4 py-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr className="border border-gray-300 text-center" key={user._id}>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => handleEdit(user._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded ml-2"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Add User Button */}
    <div className="text-center mt-12">
      <button
        onClick={handleAddUser}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add New User
      </button>
    </div>
  </div>
</div>

  );
};

export default UserList;
