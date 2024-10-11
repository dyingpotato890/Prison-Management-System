import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignUp from './Pages/Login/LoginSignUp';
import PrisonerManagement from './Pages/Prisoner Management/PrisonerManagement';
import LandingPage from './Pages/Landing/LandingPage';
import ErrorPage from './Pages/Error Page/ErrorPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignUp />} /> {/* Default route */}
        <Route path="/prisoner-management" element={<PrisonerManagement />} />
        <Route path="/Landing" element={<LandingPage />} />
        <Route path="/Error-404" element={<ErrorPage/>} />
      </Routes>
    </Router>
  );
}

export default App;