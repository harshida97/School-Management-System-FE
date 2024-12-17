import API from '../api/api';
import axios from 'axios';

// Get Fee Records
export const getFeeRecords = (page = 1, limit = 10) => async (dispatch) => {
    try {
        dispatch({ type: 'FEES_REQUEST' });

        const { data } = await API.get(`fees/getfeerecords?page=${page}&limit=${limit}`);

        dispatch({
            type: 'FEES_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'FEES_FAIL',
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Fetch Fee Record by ID
export const fetchFeeRecordById = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'FETCH_FEE_BY_ID_REQUEST' });

        const { data } = await API.get(`fees/${id}`);

        dispatch({
            type: 'FETCH_FEE_BY_ID_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'FETCH_FEE_BY_ID_FAIL',
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Add Fee Record
export const addFeeRecord = (feeData) => async (dispatch) => {
    try {
        dispatch({ type: 'ADD_FEE_REQUEST' });

        const { data } = await API.post('fees/addfeeremark', feeData);

        dispatch({
            type: 'ADD_FEE_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'ADD_FEE_FAIL',
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Update Fee Record
export const updateFeeRecord = (id, feeData) => async (dispatch) => {
    try {
        dispatch({ type: 'UPDATE_FEE_REQUEST' });

        const { data } = await API.put(`fees/${id}`, feeData);

        dispatch({
            type: 'UPDATE_FEE_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'UPDATE_FEE_FAIL',
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Delete Fee Record
export const deleteFeeRecord = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'DELETE_FEE_REQUEST' });

        await API.delete(`/fees/${id}`);

        dispatch({ type: 'DELETE_FEE_SUCCESS', payload: id });
    } catch (error) {
        dispatch({
            type: 'DELETE_FEE_FAIL',
            payload: error.response?.data?.message || error.message,
        });
    }
};
