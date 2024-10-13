import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './LoginSignUp.css';

import person_icon from '../../Components/Assets/person.png';
import password_icon from '../../Components/Assets/password.png';

const LoginSignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const headerContainer = document.querySelector('.header-container');
    const underlineElement = document.querySelector('.underline');

    if (headerContainer) {
      headerContainer.style.display = 'none';
    }
    if (underlineElement) {
      underlineElement.style.display = 'none';
    }

    return () => {
      if (headerContainer) {
        headerContainer.style.display = 'flex'; 
      }
      if (underlineElement) {
        underlineElement.style.display = 'block';
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { username, password };

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Login successful!');
        navigate('/landing');
      } else {
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
    <div className='Page'>
        <div className="Container1">
          <div className="left-container">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjOjVSf707NzI4yiSm17L243uYzyJm0hMLGsGWtqp5UY0riPGBJs21QC5XM7BlQ4dRYZc&usqp=CAU" 
              alt="Prison Logo" 
            />
            <h1>Gibraltar Correctional Facility</h1>
            <p>Prison Management System</p>
          </div>
  
          <div className="container">
            <div className="header">
              <div className="text">Sign in to your account</div>
              <div className="underline1"></div>
            </div>
    
            <form className="inputs" onSubmit={handleSubmit}>
              <div className="input">
                <img src={person_icon} alt="User Icon" />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input">
                <img src={password_icon} alt="Password Icon" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <div className="submitContainer">
                <button type="submit" className="submit">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
          <footer class="footer">
            <p>&copy; 2024 Gibraltar Correctional Facility | All Rights Reserved</p>
          </footer> 
    </div>
    );
    
};

export default LoginSignUp;
