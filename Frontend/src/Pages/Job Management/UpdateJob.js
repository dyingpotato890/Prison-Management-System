import React, { useState } from 'react';
import '../Modal/Modal';

const UpdateJob = () => {
  const [jobID, setJobID] = useState('');
  const [showHours, setShowHours] = useState(false);
  const [startHour, setStartHour] = useState('');
  const [endHour, setEndHour] = useState('');

  const handleNext = (e) => {
    e.preventDefault();
    setShowHours(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the submission of new hours
    alert(`Job ID: ${jobID}, Start Hour: ${startHour}, End Hour: ${endHour}`);
  };

  return (
    <div className="update-job-container">
      <form onSubmit={showHours ? handleSubmit : handleNext}>
        {!showHours ? (
          <>
            <label>Job ID:</label>
            <input
              type="number"
              value={jobID}
              onChange={(e) => setJobID(e.target.value)}
              placeholder="Enter Job ID"
              required
            />
            <button type="submit">Next</button>
          </>
        ) : (
          <>
            <label>New Start Hour:</label>
            <input
              type="time"
              value={startHour}
              onChange={(e) => setStartHour(e.target.value)}
              required
            />
            <label>New End Hour:</label>
            <input
              type="time"
              value={endHour}
              onChange={(e) => setEndHour(e.target.value)}
              required
            />
            <button type="submit">Update</button>
          </>
        )}
      </form>
    </div>
  );
};

export default UpdateJob;
