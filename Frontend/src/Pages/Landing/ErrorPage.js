// Components/ErrorPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css'; 

const ErrorPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="error-page">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button onClick={goHome}>Go Home</button>
    </div>
  );
};

export default ErrorPage;
