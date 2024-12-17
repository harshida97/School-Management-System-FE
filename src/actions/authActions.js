import API from '../api/api'; 

// Action types
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAIL = 'REGISTER_FAIL';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';
const LOGOUT = 'LOGOUT';

// Register action
export const register = (name, email, password, role) => async (dispatch) => {
  try {
    const { data } = await API.post('/auth/register', { name, email, password, role });

    // Store the token in localStorage after successful registration
    localStorage.setItem('token', data.token);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });


  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Login action
export const login = (email, password) => async (dispatch) => {
  try {
    const { data } = await API.post('/auth/login', { email, password });

    // Store the token in localStorage after successful login
    localStorage.setItem('token', data.token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Logout action
export const logout = () => (dispatch) => {
  localStorage.removeItem('token'); // Remove the token from localStorage
  dispatch({ type: LOGOUT });
};
