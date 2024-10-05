import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after successful login
import './LoginSignUp.css';

import person_icon from '../../Components/Assets/person.png';
import password_icon from '../../Components/Assets/password.png';

const LoginSignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async () => {
    const data = { username, password };

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Login successful!');
        navigate('/landing'); // Navigate to the landing page on successful login
      }
      else {
        alert(result.message || 'Invalid username or password');
        setError(result.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Unable to connect to the server.');
      setError('Unable to connect to the server.');
    }
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={person_icon} alt="" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {error && <p className="error-message">{error}</p>} {/* Error message */}

      <div className="submitContainer">
        <div className="submit" onClick={handleSubmit}>
          Login
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;