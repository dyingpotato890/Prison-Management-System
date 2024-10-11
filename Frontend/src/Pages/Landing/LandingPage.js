import React, { useEffect, useState } from "react";
import './Main.css';
import { useNavigate } from "react-router-dom";
import PrisonerManagement from './PrisonerManagement';
import VisitorDetails from "./VisitorTable";
import ErrorPage from "./ErrorPage";
import StaffDetails from "./StaffManagement";
import CrimeDetails from "./CrimeDetails";
import logout_icon from "../../Components/Assets/logout.svg"
import CellDetails from "./CellManagement";
function LandingPage() {
  const [activeComponent, setActiveComponent] = useState('prisonerManagement'); // Default to prisonerManagement
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle sign out and redirect to login
  const goto = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'GET',
        credentials: 'include' // Include credentials for authentication
      });

      if (response.ok) {
        navigate('/'); // Use navigate to programmatically redirect
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  const checkLogin = async () => {
    try {
      const response = await fetch('/check_login', {
        method: 'GET',
        credentials: 'include' // Include credentials for authentication
      });

      if (!response.ok) {
        navigate('/'); // Redirect to login if not authenticated
      }
    } catch (error) {
      console.error('Error during login check:', error);
      navigate('/login'); // Redirect to login on error
    }
  }

  useEffect(() => {
    checkLogin(); // Check login status on component load
  }, []);

  return (
    <div className="main">
      <div className="signout-container">
        <button 
         onClick={goto}  // Call goto to sign out and redirect
        className="signout-btn">
          <img src={logout_icon} alt="Logout Icon" />
          <span className="signout-text">Sign Out</span>
   
        </button>
      </div>
      
      <div className="sidebar">
        {/* Add 'active' class dynamically if the component is active */}
        <button 
          onClick={() => setActiveComponent('prisonerManagement')} 
          className={`action-btn ${activeComponent === 'prisonerManagement' ? 'active' : ''}`}>
          Prisoner Management
        </button>

        <button 
          onClick={() => setActiveComponent('visitorTracking')} 
          className={`action-btn ${activeComponent === 'visitorTracking' ? 'active' : ''}`}>
          Visitor Tracking
        </button>

        <button 
          onClick={() => setActiveComponent('cellManagement')} 
          className={`action-btn ${activeComponent === 'cellManagement' ? 'active' : ''}`}>
          Cell Management
        </button>

        <button 
          onClick={() => setActiveComponent('staffManagement')} 
          className={`action-btn ${activeComponent === 'staffManagement' ? 'active' : ''}`}>
          Staff Management
        </button>

        <button 
          onClick={() => setActiveComponent('crimemanagement')} 
          className={`action-btn ${activeComponent === 'crimemanagement' ? 'active' : ''}`}>
          Crime Management
        </button>
      </div>

      <div className="content">
        {activeComponent === 'prisonerManagement' && <PrisonerManagement />}
        {activeComponent === 'visitorTracking' && <VisitorDetails />}
        {activeComponent === 'cellManagement' && <CellDetails />}
        {activeComponent === 'staffManagement' && <StaffDetails />}
        {activeComponent === 'crimemanagement' && <CrimeDetails />}
      </div>
    </div>
  );
}

export default LandingPage;
