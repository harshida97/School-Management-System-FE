// src/components/UserForm.jsx
import React, { useState } from 'react';
import API from '../../api/api'
import { useLocation } from 'react-router-dom';

const UserForm = ({ onSuccess }) => {
  const location = useLocation();
  const role = location.state?.role; 
  

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Admin', // Default role
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/user/create-user', formData);
      alert('User created successfully!');
      onSuccess(); // Callback to refresh the user list
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
  {/* Title Outside Form */}
  <h2 className="text-2xl font-bold mt-32 text-center text-black mb-6">Add User</h2>

  {/* Form Section */}
  <form
    onSubmit={handleSubmit}
    className="w-[600px] mx-auto bg-white h-[500px] p-8 rounded-lg shadow-md"
  >
    <div className="flex flex-col mb-4">
      <label htmlFor="name" className="text-black font-medium mb-2">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
        className="border border-gray-300 bg-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        required
      />
    </div>

    <div className="flex flex-col mb-4">
      <label htmlFor="email" className="text-black font-medium mb-2">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        className="border border-gray-300 bg-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        required
      />
    </div>

    <div className="flex flex-col mb-4">
      <label htmlFor="password" className="text-black font-medium mb-2">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        className="border border-gray-300 bg-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        required
      />
    </div>

    <div className="flex flex-col mb-4">
      <label htmlFor="role" className="text-black font-medium mb-2">Role</label>
      <select
        id="role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="border border-gray-300 bg-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        required
      >
        <option value="Admin">Admin</option>
        <option value="Librarian">Librarian</option>
        <option value="OfficeStaff">Office Staff</option>
      </select>
    </div>

    <div className="text-center mt-5">
      <button
        type="submit"
        className="bg-gray-900 hover:bg-gray-400 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
      >
        Add User
      </button>
    </div>
  </form>
</div>


  );
};

export default UserForm;
