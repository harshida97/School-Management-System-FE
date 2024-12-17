import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing icons

const Navbar = ({ role }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle menu toggle

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-900 p-4 fixed top-0 left-0 w-full h-[100px] z-50">
      <div className="flex justify-between items-center h-full">
        {/* Left content */}
        <div className="flex items-center">
          <span className="text-white font-bold text-xl">School Management System</span>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden flex items-center" onClick={toggleMenu}>
          {isMenuOpen ? (
            <FaTimes className="text-white text-2xl" />
          ) : (
            <FaBars className="text-white text-2xl" />
          )}
        </div>

        {/* Right content */}
        <div
          className={`md:flex items-center space-x-4 absolute md:static top-20 left-0 w-full md:w-auto bg-blue-900 md:bg-transparent transition-all duration-300 ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
        >
          {/* Admin Links */}
          {role === 'Admin' && (
            <>
              <Link to="/admin-dashboard" className="text-white hover:underline">
                Admin Dashboard
              </Link>
              <Link to="/userlist" className="text-white hover:underline">
                User Manage
              </Link>
              <Link to="/studentlist" className="text-white hover:underline">
                Students
              </Link>
              <Link to="/feehistory" className="text-white hover:underline">
                Fees Manage
              </Link>
              <Link to="/libraryhistory" className="text-white hover:underline">
                Library Manage
              </Link>
              <Link to="/" className="text-white hover:underline">
                Logout
              </Link>
            </>
          )}

          {/* Librarian Links */}
          {role === 'Librarian' && (
            <>
              <Link to="/librarian-dashboard" className="text-white hover:underline">
                Librarian Dashboard
              </Link>
              <Link to="/studentlist" className="text-white hover:underline">
                Students
              </Link>
              <Link to="/feehistory" className="text-white hover:underline">
                Fees Manage
              </Link>
              <Link to="/libraryhistory" className="text-white hover:underline">
                Library Manage
              </Link>
              <Link to="/" className="text-white hover:underline">
                Logout
              </Link>
            </>
          )}

          {/* Office Staff Links */}
          {role === 'OfficeStaff' && (
            <>
              <Link to="/staff-dashboard" className="text-white hover:underline">
                Staff Dashboard
              </Link>
              <Link to="/studentlist" className="text-white hover:underline">
                Students
              </Link>
              <Link to="/feehistory" className="text-white hover:underline">
                Fees Manage
              </Link>
              <Link to="/libraryhistory" className="text-white hover:underline">
                Library Manage
              </Link>
              <Link to="/" className="text-white hover:underline">
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
