import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchStudentById, updateStudent } from '../../actions/studentActions';


const UpdateStudentForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedStudent, loading, error, success } = useSelector((state) => state.student || {});

  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [division, setDivision] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    dispatch(fetchStudentById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedStudent) {
      setName(selectedStudent.name || '');
      setClassName(selectedStudent.class || '');
      setDivision(selectedStudent.division || '');
      setAge(selectedStudent.age || '');
      setEmail(selectedStudent.email || '');
    }
  }, [selectedStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedStudent = { name, class: className, division, age, email };
    dispatch(updateStudent(id, updatedStudent));
  };

  const handleCancel = () => {
    navigate('/studentlist'); // Redirect back to library records list
  };


  useEffect(() => {
    if (success) navigate('/students');
  }, [success, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
  
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  {/* Header Section */}
  <h2 className="text-2xl font-semibold mt-32 mb-2 text-center">Edit Student Details</h2>
        <form onSubmit={handleSubmit} className="w-[600px] mx-auto bg-white  p-8 rounded-lg shadow-md">
          <div>
            <label className="block text-sm text-black font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter student name"
              className="mt-1 bg-gray-200 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-black font-medium">Class</label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Enter class"
              className="mt-1 bg-gray-200 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-black font-medium">Division</label>
            <input
              type="text"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              placeholder="Enter division"
              className="mt-1 bg-gray-200 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-black font-medium">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age"
              className="mt-1 bg-gray-200 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-black font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="mt-1 bg-gray-200 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* Submit and Cancel Buttons */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-gray-900 text-white mt-4 font-bold py-2 px-6 rounded-lg transition duration-200"
            >
              Update Student
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-900 text-white mt-4 font-bold py-2 px-6 rounded-lg transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    
  
  );
};

export default UpdateStudentForm;
