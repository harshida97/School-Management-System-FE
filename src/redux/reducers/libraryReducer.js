const initialState = {
  libraryRecords: [],
  libraryRecord: null,
  loading: false,
  error: null,
};

const libraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_LIBRARY_RECORDS_REQUEST':
    case 'FETCH_LIBRARY_RECORD_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_LIBRARY_RECORDS_SUCCESS':
      return { ...state, loading: false, libraryRecords: action.payload };
    case 'FETCH_LIBRARY_RECORD_SUCCESS':
      return { ...state, loading: false, libraryRecord: action.payload };
    case 'FETCH_LIBRARY_RECORDS_FAILURE':
    case 'FETCH_LIBRARY_RECORD_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_LIBRARY_RECORD_SUCCESS':
      return { ...state, libraryRecords: [...state.libraryRecords, action.payload] };
    case 'UPDATE_LIBRARY_RECORD_SUCCESS':
      return {
        ...state,
        libraryRecord: action.payload,
        libraryRecords: state.libraryRecords.map((record) =>
          record._id === action.payload._id ? action.payload : record
        ),
      };
    case 'DELETE_LIBRARY_RECORD_SUCCESS':
      return {
        ...state,
        libraryRecords: state.libraryRecords.filter((record) => record._id !== action.payload),
      };
    default:
      return state;
  }
};

export default libraryReducer;
