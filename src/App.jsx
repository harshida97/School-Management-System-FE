import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import AdminRegistrationForm from './components/auth/AdminRegistrationForm';
import LoginForm from './components/auth/LoginForm';
import AddStudentForm from './components/students/AddStudentForm';
import StudentList from './components/students/StudentList';
import FeesHistory from './components/fees/FeesHistory';
import UpdateLibraryRecordForm from './components/library/UpdateLibraryRecordForm';
import UpdateStudentForm from './components/students/UpdateStudentForm';
import UpdateFeeRecordForm from './components/fees/UpdateFeeRecordForm';
import AddLibraryForm from './components/library/AddLibraryForm';
import LibraryHistory from './components/library/LibraryHistory';
import UserForm from './components/user/UserForm';
import UpdateUserForm from './components/user/UpdateUserForm';
import UserList from './components/user/UserList';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import FeesRemarksForm from './components/fees/FeesRemarksForm';
import LibrarianDashboard from './pages/LibrarianDashboard';
import Navbar from './components/Navbar';

const App = () => {
  const [role, setRole] = useState('');
  const location = useLocation(); // Use useLocation for conditional Navbar rendering

  // Define routes where the Navbar should not appear
  const hideNavbarRoutes = ['/']; // Add any other routes where Navbar should be hidden

  useEffect(() => {
    // Get the role from localStorage
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole); // Set role dynamically
    }
  }, []);

  return (
    <>
      {/* Conditionally render the Navbar */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar role={role} />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<AdminRegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/librarian-dashboard" element={<LibrarianDashboard />} />
        <Route path="/staff-dashboard" element={<LibrarianDashboard />} />

        <Route path="/addstudent" element={<AddStudentForm />} />
        <Route path="/studentlist" element={<StudentList />} />
        <Route path="update-student/:id" element={<UpdateStudentForm />} />

        <Route path="/feehistory" element={<FeesHistory />} />
        <Route path="/updatefee-record/:id" element={<UpdateFeeRecordForm />} />
        <Route path="/feesremarks" element={<FeesRemarksForm />} />

        <Route path="/addlibrary" element={<AddLibraryForm />} />
        <Route path="/libraryhistory" element={<LibraryHistory />} />
        <Route path="/update-library-record/:id" element={<UpdateLibraryRecordForm />} />

        <Route path="/adduserform" element={<UserForm />} />
        <Route path="/update-user/:id" element={<UpdateUserForm />} />
        <Route path="/userlist" element={<UserList />} />
      </Routes>
    </>
  );
};

export default App;
