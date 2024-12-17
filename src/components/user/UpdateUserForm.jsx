import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api/api';
import { useLocation } from 'react-router-dom';

const UpdateUserForm = () => {
  const location = useLocation();
  const role = location.state?.role; 
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', role: '' });
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await API.get(`/user/${id}`);
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/user/update-user/${id}`, user);
      alert('User updated successfully!');
      navigate('/userlist'); // Redirect back to user list
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
  {/* Container for Title and Form */}
  <div className="w-full max-w-md mt-12 p-6">
    {/* Title */}
    <h2 className="text-2xl font-bold mb-6 text-black text-center">Edit User Details</h2>

    {/* Form */}
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-6 w-full">
      {/* Name Input */}
      <div className="flex flex-col space-y-2">
        <label className="font-semibold text-black">Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Email Input */}
      <div className="flex flex-col space-y-2">
        <label className="font-semibold text-black">Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Role Selection */}
      <div className="flex flex-col space-y-2">
        <label className="font-semibold text-black">Role</label>
        <select
          name="role"
          value={user.role}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="Admin">Admin</option>
          <option value="Librarian">Librarian</option>
          <option value="OfficeStaff">Office Staff</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
        >
          Update
        </button>
      </div>
    </form>
  </div>
</div>




  );
};

export default UpdateUserForm;
