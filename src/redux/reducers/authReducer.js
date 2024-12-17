const initialState = {
    userInfo: null,
    loading: false,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'REGISTER_SUCCESS':
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          userInfo: action.payload,
          loading: false,
          error: null,
        };
      case 'REGISTER_FAIL':
      case 'LOGIN_FAIL':
        return {
          ...state,
          userInfo: null,
          loading: false,
          error: action.payload,
        };
      case 'LOGOUT':
        return {
          ...state,
          userInfo: null,
          loading: false,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  