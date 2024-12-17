import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLibraryRecords, deleteLibraryRecord } from '../../actions/libraryActions';
import { useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const LibraryHistory = () => {
  const location = useLocation();

  // Try to get the role from location state or fallback to localStorage
  const role = location.state?.role || localStorage.getItem('role') || 'Guest';

  console.log("Role:", role);  // Log the role to ensure it's being retrieved correctly

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { libraryRecords, loading, error } = useSelector((state) => state.library);

  useEffect(() => {
    dispatch(fetchLibraryRecords());
  }, [dispatch]);

  // Log role and libraryRecords after they have been fetched
  useEffect(() => {
    console.log('Role:', role);
    console.log('Library Records:', libraryRecords);
  }, [role, libraryRecords]);

  // Delete handler
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      dispatch(deleteLibraryRecord(id));
    }
  };

  // Update handler
  const handleUpdate = (id) => {
    console.log(`Navigating to update page for record with ID: ${id}`);
    navigate(`/update-library-record/${id}`);
  };

  // Add New Record handler
  const handleAdd = () => {
    navigate(`/addlibrary`);
  };

  // Render loading or error state
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
 
    <h2 className="text-2xl font-bold text-center mb-5 mt-8">Library History</h2>

    {/* Table for Library Records */}
    <div className="flex justify-center">
      <table className="table-auto w-full border-collapse bg-gray-200 border border-gray-300">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border border-gray-300 px-4 py-2">Student Name</th>
            <th className="border border-gray-300 px-4 py-2">Book Name</th>
            <th className="border border-gray-300 px-4 py-2">Borrow Date</th>
            <th className="border border-gray-300 px-4 py-2">Return Date</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            {(role === 'Admin' || role === 'Librarian') && (
              <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {libraryRecords.map((record) => (
            <tr key={record._id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{record.student?.name || 'N/A'}</td>
              <td className="border border-gray-300 px-4 py-2">{record.book}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(record.borrowDate).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(record.returnDate).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full ${
                    record.status === 'Returned'
                      ? 'bg-green-500 text-white'
                      : record.status === 'Borrowed'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-300 text-black'
                  }`}
                >
                  {record.status}
                </span>
              </td>
              {(role === 'Admin' || role === 'Librarian') && (
                <td className="border px-4 py-2 flex justify-center items-center gap-2">
                  <button
                    onClick={() => handleUpdate(record._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(record._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Add New Record button for Librarian */}
    {role === 'Librarian' && (
      <div className="flex justify-center mt-4">
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Add New Record
        </button>
      </div>
    )}

    {/* Message for OfficeStaff */}
    {role === 'OfficeStaff' && (
      <p className="text-center mt-6 text-gray-600">No actions available for Office Staff.</p>
    )}
  </div>


  );
};

export default LibraryHistory;
