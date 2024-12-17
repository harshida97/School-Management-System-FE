import React, { useState, useEffect } from 'react';
import API from '../../api/api';
import { useNavigate } from 'react-router-dom';

const AddLibraryForm = ({ onCancel }) => {
  const [student, setStudent] = useState('');
  const [book, setBook] = useState('');
  const [borrowDate, setBorrowDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [status, setStatus] = useState('Borrowed');
  const [students, setStudents] = useState([]); // State to store students
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch students when the component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await API.get('/students/getstudents');
        setStudents(response.data); // Set the student data
      } catch (err) {
        setError('Failed to load students');
      }
    };

    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newLibraryRecord = { student, book, borrowDate, returnDate, status };
      await API.post('library/addlibraryrecord', newLibraryRecord);
      alert('Library record added successfully');
      navigate('/libraryhistory');
    } catch (err) {
      setError('Error adding library record');
    }
  };

  const handleCancel = () => {
    navigate('/libraryhistory');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  {/* Header Section */}
  <h2 className="text-2xl font-semibold mt-32 mb-2 text-center">Add Library Record</h2>

  {/* Form Container */}
  <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
    {error && <p className="text-red-500 mb-4">{error}</p>}

    {/* Form */}
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="student" className="block text-sm font-medium text-black">Student</label>
        <select
          id="student"
          value={student}
          onChange={(e) => setStudent(e.target.value)}
          required
          className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student._id} {/* Display student ID */}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="book" className="block text-sm font-medium text-black">Book</label>
        <input
          type="text"
          id="book"
          value={book}
          onChange={(e) => setBook(e.target.value)}
          required
          className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="borrowDate" className="block text-sm font-medium text-black">Borrow Date</label>
        <input
          type="date"
          id="borrowDate"
          value={borrowDate}
          onChange={(e) => setBorrowDate(e.target.value)}
          required
          className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="returnDate" className="block text-sm font-medium text-black">Return Date</label>
        <input
          type="date"
          id="returnDate"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-black">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Borrowed">Borrowed</option>
          <option value="Returned">Returned</option>
        </select>
      </div>

      <div className="flex justify-between space-x-4">
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Record
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="w-full py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default AddLibraryForm;
