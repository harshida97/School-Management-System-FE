import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeeRecordById, updateFeeRecord } from '../../actions/feesActions';

const UpdateFeeRecordForm = ({ recordId, onClose }) => {
  const dispatch = useDispatch();
  const { feeRecord, loading } = useSelector((state) => state.fees);

  const [formData, setFormData] = useState({
    student: '',
    feeType: '',
    amount: '',
    paymentDate: '',
    remarks: '',
  });

  useEffect(() => {
    if (recordId) {
      dispatch(fetchFeeRecordById(recordId));
    }
  }, [dispatch, recordId]);

  useEffect(() => {
    if (feeRecord) {
      setFormData({
        student: feeRecord.student.name,
        feeType: feeRecord.feeType,
        amount: feeRecord.amount,
        paymentDate: feeRecord.paymentDate.slice(0, 10), // Format for input[type="date"]
        remarks: feeRecord.remarks,
      });
    }
  }, [feeRecord]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateFeeRecord(recordId, formData));
    onClose(); // Close the form after updating
  };

  if (loading) return <p>Loading fee record details...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  {/* Header Section */}
  <h2 className="text-2xl font-semibold mt-32 mb-2 text-center">Update Fee Record</h2>
    <form onSubmit={handleSubmit} className="w-[600px] mx-auto bg-white  p-8 rounded-lg shadow-md">
  
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Student</label>
        <input
          type="text"
          name="student"
          value={formData.student}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Fee Type</label>
        <input
          type="text"
          name="feeType"
          value={formData.feeType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Payment Date</label>
        <input
          type="date"
          name="paymentDate"
          value={formData.paymentDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Remarks</label>
        <textarea
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>
      </div>
      <div className='flex space-x-2 justify-center'>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Update
      </button>
      <button
        type="button"
        onClick={onClose}
        className="ml-2 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
      >
        Cancel
      </button>
      </div>
    </form>
    </div>
  );
};

export default UpdateFeeRecordForm;
