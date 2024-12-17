import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addStudent } from '../../actions/studentActions.js'
import Navbar from '../Navbar.jsx';

const AddStudentForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    class: '',
    division: '',
    age: '',
    email: '',
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addStudent(form));
    setForm({ name: '', class: '', division: '', age: '', email: '' });

    navigate('/studentlist'); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  {/* Header Section */}
  <h2 className="text-2xl font-semibold mt-32 mb-2 text-center">Add Student</h2>

  {/* Form */}
  <form
    onSubmit={handleSubmit}
    className="w-[600px] mx-auto bg-white  p-8 rounded-lg shadow-md"
  >
    <div className="space-y-3">
      <div className="flex flex-col">
        <label className="font-semibold text-black">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full bg-gray-200 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold text-black">Class</label>
        <input
          type="text"
          name="class"
          placeholder="Class"
          value={form.class}
          onChange={handleChange}
          required
          className="w-full p-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold text-black">Division</label>
        <input
          type="text"
          name="division"
          placeholder="Division"
          value={form.division}
          onChange={handleChange}
          required
          className="w-full p-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold text-black">Age</label>
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
          className="w-full p-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold text-black">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    {/* Submit Button */}
    <div className="text-center mt-6">
      <button
        type="submit"
        className="bg-gray-900 hover:bg-gray-400 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
      >
        Add Student
      </button>
    </div>
  </form>
</div>




  );
};

export default AddStudentForm;
