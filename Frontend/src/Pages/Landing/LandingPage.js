import React, { useState } from "react";
import './Main.css';
import { useNavigate } from "react-router-dom";
import PrisonerManagement from './PrisonerManagement';
import VisitorDetails from "./VisitorTable";
import ErrorPage from "./ErrorPage";
import StaffDetails from "./StaffManagement"
import CrimeDetails from "./CrimeDetails";

function LandingPage() {
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
          Visitor Tracking
        </button>
        
        <button 
          onClick={() => setActiveComponent('cellManagement')} 
          className="action-btn">
          Cell Management
        </button>
        
        <button 
          onClick={() => setActiveComponent('staffManagement')} 
          className="action-btn">
          Staff Management
        </button>

        <button 
          onClick={() => setActiveComponent('crimemanagement')} 
          className="action-btn">
          Crime Management
        </button>

      </div>

      <div className="content">
        {/* Conditionally render components based on activeComponent */}
        {activeComponent === 'prisonerManagement' && <PrisonerManagement />}
        {activeComponent === 'visitorTracking' && <div><VisitorDetails /></div>}
        {activeComponent === 'cellManagement' && <div><ErrorPage/></div>}
        {activeComponent === 'staffManagement' && <div><StaffDetails /></div>}
        {activeComponent === 'crimemanagement' && <div><CrimeDetails /></div>}
      </div>
    </div>
  );
}

export default LandingPage;