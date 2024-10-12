import React, { useState } from 'react';

const GetTotalHours = () => {
  const [prisonerID, setPrisonerID] = useState('');
  const [totalHours, setTotalHours] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/total-work-hours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prisoner_id: prisonerID }), // Send prisoner ID as JSON
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setTotalHours(data.total_hours); // Set the fetched total hours
    } catch (error) {
      console.error("Error fetching total hours:", error);
      setTotalHours(''); // Clear previous hours on error
    }
  };

  return (
    <div className="total-hours-container">
      <form onSubmit={handleSubmit}>
        <label>Prisoner ID:</label>
        <input
          type="number"
          value={prisonerID}
          onChange={(e) => setPrisonerID(e.target.value)}
          placeholder="Enter Prisoner ID"
          required
        />
        <button type="submit" className="submit-btn">Calculate</button>
        {totalHours && (
          <div className='Totalhrs'>
            <label className='bold'>Total Hours:</label>
            <input
              type="text"
              value={totalHours}
              readOnly
              placeholder="Total Hours"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default GetTotalHours;