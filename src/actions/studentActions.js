import API from '../api/api';

// Action Types
const FETCH_STUDENTS_REQUEST = 'FETCH_STUDENTS_REQUEST';
const FETCH_STUDENTS_SUCCESS = 'FETCH_STUDENTS_SUCCESS';
const FETCH_STUDENTS_FAILURE = 'FETCH_STUDENTS_FAILURE';
const FETCH_STUDENT_BY_ID_REQUEST = 'FETCH_STUDENT_BY_ID_REQUEST';
const FETCH_STUDENT_BY_ID_SUCCESS = 'FETCH_STUDENT_BY_ID_SUCCESS';
const FETCH_STUDENT_BY_ID_FAILURE = 'FETCH_STUDENT_BY_ID_FAILURE';
const ADD_STUDENT_SUCCESS = 'ADD_STUDENT_SUCCESS';
const ADD_STUDENT_FAILURE = 'ADD_STUDENT_FAILURE';
const UPDATE_STUDENT_SUCCESS = 'UPDATE_STUDENT_SUCCESS';
const UPDATE_STUDENT_FAILURE = 'UPDATE_STUDENT_FAILURE';
const DELETE_STUDENT_SUCCESS = 'DELETE_STUDENT_SUCCESS';
const DELETE_STUDENT_FAILURE = 'DELETE_STUDENT_FAILURE';

// Fetch all students
export const fetchStudents = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_STUDENTS_REQUEST });
    const { data } = await API.get('/students/getstudents');
    dispatch({ type: FETCH_STUDENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_STUDENTS_FAILURE, payload: error.message });
  }
};

// Fetch student by ID
export const fetchStudentById = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_STUDENT_BY_ID_REQUEST });
    const { data } = await API.get(`/students/${id}`);
    dispatch({ type: FETCH_STUDENT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_STUDENT_BY_ID_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Add a new student
export const addStudent = (studentData) => async (dispatch) => {
  try {
    const { data } = await API.post('/students/addstudent', studentData);
    dispatch({ type: ADD_STUDENT_SUCCESS, payload: data });
    alert('Student added successfully!');
  } catch (error) {
    dispatch({
      type: ADD_STUDENT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    alert('Failed to add student.');
  }
};

// Update a student's details
export const updateStudent = (id, updatedData) => async (dispatch) => {
  try {
    const { data } = await API.put(`/students/${id}`, updatedData);
    dispatch({ type: UPDATE_STUDENT_SUCCESS, payload: data });
    alert('Student updated successfully!');
  } catch (error) {
    dispatch({
      type: UPDATE_STUDENT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    alert('Failed to update student.');
  }
};

// Delete a student
export const deleteStudent = (id) => {
  return async (dispatch) => {
    try {
      const response = await API.delete(`/students/${id}`);
      dispatch({ type: 'DELETE_STUDENT_SUCCESS', payload: id });
      alert('Student record deleted successfully!');
    } catch (error) {
      console.error('Error deleting student:', error);
      // Handle error (e.g., show an error message)
    }
  };
};