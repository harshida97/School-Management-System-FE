const initialState = {
  loading: false,
  feeRecords: [],
  totalPages: 0,
  currentPage: 1,
  totalRecords: 0,
  error: null,
  addSuccess: false,
  deleteSuccess: false,
  updateSuccess: false,
};

const feesReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'FEES_REQUEST':
      case 'ADD_FEE_REQUEST':
      case 'DELETE_FEE_REQUEST':
      case 'UPDATE_FEE_REQUEST':
          return { ...state, loading: true, error: null };

      case 'FEES_SUCCESS':
          return {
              ...state,
              loading: false,
              feeRecords: action.payload.records,
              totalPages: action.payload.totalPages,
              currentPage: action.payload.currentPage,
              totalRecords: action.payload.totalRecords,
          };

      case 'ADD_FEE_SUCCESS':
          return { ...state, loading: false, addSuccess: true };

      case 'DELETE_FEE_SUCCESS':
          return {
              ...state,
              loading: false,
              deleteSuccess: true,
              feeRecords: state.feeRecords.filter((record) => record._id !== action.payload),
          };

      case 'UPDATE_FEE_SUCCESS':
          return {
              ...state,
              loading: false,
              updateSuccess: true,
              feeRecords: state.feeRecords.map((record) =>
                  record._id === action.payload._id ? action.payload : record
              ),
          };

      case 'FEES_FAIL':
      case 'ADD_FEE_FAIL':
      case 'DELETE_FEE_FAIL':
      case 'UPDATE_FEE_FAIL':
          return { ...state, loading: false, error: action.payload };

      default:
          return state;
  }
};

export default feesReducer;
