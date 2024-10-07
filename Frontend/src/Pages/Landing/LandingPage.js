import React, { useState } from "react";
import './Main.css';
import { useNavigate } from "react-router-dom";
import PrisonerManagement from './PrisonerManagement';
import VisitorDetails from "./VisitorTable";
import ErrorPage from "./ErrorPage";
import StaffDetails from "./StaffManagement";
import CrimeDetails from "./CrimeDetails";

function LandingPage() {
  const [activeComponent, setActiveComponent] = useState('prisonerManagement'); // Default to prisonerManagement
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle sign out and redirect to login
  const goto = () => {
    navigate('/'); // Use navigate to programmatically redirect
  }

  return (
    <div className="main">
      <div className="signout">
        <button 
          onClick={goto}  // Call goto to sign out and redirect
          className="signout-btn">
          Sign Out
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
        {activeComponent === 'cellManagement' && <ErrorPage />}
        {activeComponent === 'staffManagement' && <StaffDetails />}
        {activeComponent === 'crimemanagement' && <CrimeDetails />}
      </div>
    </div>
  );
}

export default LandingPage;
