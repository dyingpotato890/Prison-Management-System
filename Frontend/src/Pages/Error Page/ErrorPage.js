// Components/ErrorPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css'; 

const ErrorPage = () => {
  const navigate = useNavigate();
 
  return (
    <div className="error-page">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>Kindly click on other functions ,Thank You </p>
    </div>
  );
};

export default ErrorPage;