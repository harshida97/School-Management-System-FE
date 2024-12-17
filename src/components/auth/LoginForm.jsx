import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/api';

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);  // Store the role in localStorage
      //localStorage.setItem('userRole', response.data.role);

      const { role } = data;

      if (role === 'Admin') navigate('/admin-dashboard');
      else if (role === 'OfficeStaff') navigate('/staff-dashboard');
      else if (role === 'Librarian') navigate('/librarian-dashboard');
    } catch (error) {
      alert('Invalid login credentials');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="bg-blue-900 p-6 rounded-lg text-center shadow-md w-96">
        <h2 className="text-2xl text-white font-semibold text-center mb-4">Login</h2>
        
        <input
          type="email"
          placeholder="Email"
          className="w-full bg-gray-200 p-2 mb-4 border border-gray-300 rounded-md"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          className="w-full  bg-gray-200 p-2 mb-4 border border-gray-300 rounded-md"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        
        <button
          type="submit"
          className="w-[200px]  bg-gray-900 text-white p-2 rounded-md hover:bg-gray-100 hover:text-black"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
