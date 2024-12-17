const initialState = {
  students: [],
  selectedStudent: null,
  loading: false,
  error: null,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_STUDENTS_REQUEST':
      return { ...state, loading: true, error: null };

    case 'FETCH_STUDENTS_SUCCESS':
      return { ...state, loading: false, students: action.payload, selectedStudent: null, error: null };

    case 'FETCH_STUDENTS_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'ADD_STUDENT':
      return { ...state, students: [...state.students, action.payload] };

    case 'UPDATE_STUDENT':
      return {
        ...state,
        students: state.students.map((student) =>
          student._id === action.payload._id ? action.payload : student
        ),
      };

    case 'DELETE_STUDENT':
      return {
        ...state,
        students: state.students.filter((student) => student._id !== action.payload),
      };

    case 'FETCH_STUDENT_BY_ID_REQUEST':
      return { ...state, loading: true, error: null };

    case 'FETCH_STUDENT_BY_ID_SUCCESS':
      return { ...state, loading: false, selectedStudent: action.payload, error: null };

    case 'FETCH_STUDENT_BY_ID_FAILURE':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default studentReducer;
