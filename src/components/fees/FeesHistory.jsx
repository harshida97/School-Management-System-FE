import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeeRecords, deleteFeeRecord } from '../../actions/feesActions';
import { useLocation, useNavigate } from 'react-router-dom';

const FeesHistory = () => {
    const location = useLocation();
    const role = location.state?.role || localStorage.getItem('role') || 'Guest';

    // Debugging the role
    console.log('Current Role:', role);

    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate hook

    const { feeRecords, loading, error, totalPages, currentPage } = useSelector((state) => state.fees);
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getFeeRecords(page));
    }, [dispatch, page]);

    // Handle update functionality
    const handleUpdate =(id) => {
        navigate(`/updatefee-record/${id}`)
    }

    // Handle delete functionality
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            await dispatch(deleteFeeRecord(id)); // Ensure delete action is awaited
            alert('Record deleted successfully');
        }
    };

    // Navigate to the fee remarks page for adding a new fee record
    const handleAddNewFeeRecord = () => {
        navigate('/feesremarks');
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mt-10 mb-8 text-center">Fee Records</h2>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    <table className="table-auto w-[1210px] border-collapse bg-gray-200 border border-gray-300">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="border border-gray-300 px-4 py-2">Student Name</th>
                                <th className="border border-gray-300 px-4 py-2">Class</th>
                                <th className="border border-gray-300 px-4 py-2">Division</th>
                                <th className="border border-gray-300 px-4 py-2">Fee Type</th>
                                <th className="border border-gray-300 px-4 py-2">Amount</th>
                                <th className="border border-gray-300 px-4 py-2">Payment Date</th>
                                <th className="border border-gray-300 px-4 py-2">Remarks</th>
                                {(role === 'Admin' || role === 'OfficeStaff') && (
                                    <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {feeRecords.map((fee) => (
                                <tr key={fee._id} className="text-center">
                                    <td className="border border-gray-300 px-4 py-2">{fee.student?.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{fee.student?.class}</td>
                                    <td className="border border-gray-300 px-4 py-2">{fee.student?.division}</td>
                                    <td className="border border-gray-300 px-4 py-2">{fee.feeType}</td>
                                    <td className="border border-gray-300 px-4 py-2">{fee.amount}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {new Date(fee.paymentDate).toLocaleDateString()}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{fee.remarks || 'N/A'}</td>
                                    
                                    {/* Display Actions based on role */}
                                    {(role === 'OfficeStaff' || role === 'Admin') && (
                                        <td className="border border-gray-300 px-4 py-2">
                                            {/* OfficeStaff can update and delete */}
                                            {role === 'OfficeStaff' && (
                                                <div className="flex space-x-2 justify-center">
                                                    <button
                                                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                                        onClick={() => handleUpdate(fee._id)}
                                                    >
                                                        Update
                                                    </button>
                                                    <button
                                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                                        onClick={() => handleDelete(fee._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                            {/* Admin can only delete */}
                                            {role === 'Admin' && (
                                                <button
                                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                                    onClick={() => handleDelete(fee._id)}
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Only OfficeStaff can add new fee record */}
                    {role === 'OfficeStaff' && (
                        <div className="mt-8 flex justify-center mb-4">
                            <button
                                onClick={handleAddNewFeeRecord}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Add New Fee Record
                            </button>
                        </div>
                    )}

                    {/* Pagination buttons */}
                    <div className="mt-4 flex justify-center space-x-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage((prev) => prev - 1)}
                            className={`px-4 py-2 rounded ${page === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                        >
                            Previous
                        </button>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage((prev) => prev + 1)}
                            className={`px-4 py-2 rounded ${page === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default FeesHistory;
