import API from '../api/api';

// Fetch all library records
export const fetchLibraryRecords = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_LIBRARY_RECORDS_REQUEST' });
    const { data } = await API.get('/library/getlibraryrecords');
    dispatch({ type: 'FETCH_LIBRARY_RECORDS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'FETCH_LIBRARY_RECORDS_FAILURE',
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Add a library record
export const addLibraryRecord = (recordData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await API.post('/library/addlibraryrecord', recordData, config);
    dispatch({ type: 'ADD_LIBRARY_RECORD_SUCCESS', payload: data });
    alert('Library record added successfully!');
  } catch (error) {
    console.error('Error adding library record:', error.response?.data?.message || error.message);
  }
};

// Update a library record
export const updateLibraryRecord = (id, updatedData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await API.put(`/library/${id}`, updatedData, config);
    dispatch({ type: 'UPDATE_LIBRARY_RECORD_SUCCESS', payload: data });
    alert('Library record updated successfully!');
  } catch (error) {
    console.error('Error updating library record:', error.response?.data?.message || error.message);
  }
};

// Fetch a single library record by ID
export const fetchLibraryRecordById = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_LIBRARY_RECORD_REQUEST' });
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await API.get(`/library/${id}`, config);
    dispatch({ type: 'FETCH_LIBRARY_RECORD_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'FETCH_LIBRARY_RECORD_FAILURE',
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Delete a library record
export const deleteLibraryRecord = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await API.delete(`/library/${id}`, config);
    dispatch({ type: 'DELETE_LIBRARY_RECORD_SUCCESS', payload: id });
    alert('Library record deleted successfully!');
  } catch (error) {
    console.error('Error deleting library record:', error.response?.data?.message || error.message);
  }
};
