import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the role and token from localStorage
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to the login page
  }, [navigate]);

  return null; // You can show a loading spinner or message if you like
};

export default Logout;
