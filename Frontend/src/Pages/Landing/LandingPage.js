import React, { useState } from "react";
import './Main.css';
import PrisonerManagement from './PrisonerManagement';
import LoginSignUp from "../Login/LoginSignUp";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Main() {
  const [activeComponent, setActiveComponent] = useState(null); // Manage which component to display
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
        {/* When the button is clicked, set activeComponent to 'prisonerManagement' */}
        <button 
          onClick={() => setActiveComponent('prisonerManagement')} 
          className="action-btn">
          Prisoner Management
        </button>
        
        <button 
          onClick={() => setActiveComponent('visitorTracking')} 
          className="action-btn">
          Visitor And Incident Tracking
        </button>
        
        <button 
          onClick={() => setActiveComponent('cellManagement')} 
          className="action-btn">
          Cell And Task Management
        </button>
        
        <button 
          onClick={() => setActiveComponent('staffManagement')} 
          className="action-btn">
          Staff Management
        </button>

      </div>

      <div className="content">
        {/* Conditionally render components based on activeComponent */}
        {activeComponent === 'prisonerManagement' && <PrisonerManagement />}
        {activeComponent === 'visitorTracking' && <div>Visitor and Incident Tracking Content</div>}
        {activeComponent === 'cellManagement' && <div>Cell and Task Management Content</div>}
        {activeComponent === 'staffManagement' && <div>Staff Management Content</div>}
      </div>
    </div>
  );
}

export default Main;
