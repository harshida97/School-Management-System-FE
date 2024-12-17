import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './reducers/studentReducer';
import libraryReducer from './reducers/libraryReducer'; 
import feesReducer from './reducers/feesReducer'; 
import authReducer from './reducers/authReducer'; 

export const store = configureStore({
  reducer: {
    students: studentReducer,
    library: libraryReducer,
    fees: feesReducer,
    auth: authReducer,
  },
});
