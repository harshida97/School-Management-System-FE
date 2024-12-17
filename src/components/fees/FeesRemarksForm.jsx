import React, { useState } from 'react';
import API from '../../api/api'

const FeeRemarksCreateForm = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    feeType: '',
    amount: '',
    paymentDate: '',
    remarks: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate the form inputs
  const validateForm = () => {
    const errors = {};

    if (!formData.studentId.trim()) errors.studentId = 'Student ID is required';
    if (!formData.feeType.trim()) errors.feeType = 'Fee Type is required';
    if (!formData.amount.trim() || isNaN(formData.amount))
      errors.amount = 'Valid amount is required';
    if (!formData.paymentDate)
      errors.paymentDate = 'Payment Date is required';
    if (!formData.remarks.trim())
      errors.remarks = 'Remarks are required';

    return errors;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await API.post('addfeeremark', formData); // Adjust the endpoint as per your backend
      setSuccessMessage('Remarks added successfully!');
      setFormData({
        studentId: '',
        feeType: '',
        amount: '',
        paymentDate: '',
        remarks: '',
      });
    } catch (error) {
      setErrors({
        server: error.response?.data?.message || 'Failed to add remarks. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mt-32 mb-8 text-center">Add Fee Remarks</h2>
      {successMessage && (
        <p className="bg-green-100 text-green-800 p-2 rounded mb-4">{successMessage}</p>
      )}

      {errors.server && (
        <p className="bg-red-100 text-red-800 p-2 rounded mb-4">{errors.server}</p>
      )}

      <form onSubmit={handleSubmit} className='w-[600px] mx-auto bg-white  p-8 rounded-lg shadow-md'>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Student ID</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          {errors.studentId && <p className="text-red-500 text-sm">{errors.studentId}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Fee Type</label>
          <input
            type="text"
            name="feeType"
            value={formData.feeType}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          {errors.feeType && <p className="text-red-500 text-sm">{errors.feeType}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Amount</label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Payment Date</label>
          <input
            type="date"
            name="paymentDate"
            value={formData.paymentDate}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          {errors.paymentDate && <p className="text-red-500 text-sm">{errors.paymentDate}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Remarks</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          ></textarea>
          {errors.remarks && <p className="text-red-500 text-sm">{errors.remarks}</p>}
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 text-white rounded ${isSubmitting ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default FeeRemarksCreateForm;
