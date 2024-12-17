import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLibraryRecordById, updateLibraryRecord } from '../../actions/libraryActions';

const UpdateLibraryRecordForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { libraryRecord, loading, error } = useSelector((state) => state.library);

  const [formData, setFormData] = useState({
    book: '',
    borrowDate: '',
    returnDate: '',
    status: '',
  });

  useEffect(() => {
    if (!libraryRecord || libraryRecord._id !== id) {
      dispatch(fetchLibraryRecordById(id)); // Fetch record if not already loaded
    } else {
      setFormData({
        book: libraryRecord.book,
        borrowDate: libraryRecord.borrowDate.slice(0, 10), // Format date for input field
        returnDate: libraryRecord.returnDate ? libraryRecord.returnDate.slice(0, 10) : '',
        status: libraryRecord.status,
      });
    }
  }, [dispatch, id, libraryRecord]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateLibraryRecord(id, formData));
    navigate('/libraryhistory'); // Navigate back to the library records list
  };

  const handleCancel = () => {
    navigate('/libraryhistory'); // Redirect back to library records list
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  {/* H1 Outside the Form */}
  <h2 className="text-2xl font-semibold text-center mt-32 text-black mb-6">
    Update Library Record
  </h2>

  <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-lg">
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Book Field */}
      <div className="flex flex-col">
        <label htmlFor="book" className="font-medium text-black mb-2">
          Book:
        </label>
        <input
          type="text"
          id="book"
          name="book"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.book}
          onChange={handleChange}
          required
        />
      </div>

      {/* Borrow Date Field */}
      <div className="flex flex-col">
        <label htmlFor="borrowDate" className="font-medium text-black mb-2">
          Borrow Date:
        </label>
        <input
          type="date"
          id="borrowDate"
          name="borrowDate"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.borrowDate}
          onChange={handleChange}
          required
        />
      </div>

      {/* Return Date Field */}
      <div className="flex flex-col">
        <label htmlFor="returnDate" className="font-medium text-black mb-2">
          Return Date:
        </label>
        <input
          type="date"
          id="returnDate"
          name="returnDate"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.returnDate}
          onChange={handleChange}
        />
      </div>

      {/* Status Field */}
      <div className="flex flex-col">
        <label htmlFor="status" className="font-medium text-black mb-2">
          Status:
        </label>
        <select
          id="status"
          name="status"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="">Select Status</option>
          <option value="Borrowed">Borrowed</option>
          <option value="Returned">Returned</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-4">
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Record
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="w-full p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</div>


  );
};

export default UpdateLibraryRecordForm;
