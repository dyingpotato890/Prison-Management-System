import React, { useState } from 'react';


const GetTotalHours = () => {
  const [prisonerID, setPrisonerID] = useState('');
  const [totalHours, setTotalHours] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Logic to calculate or fetch total hours based on prisoner ID

    const fetchedHours = 40; // This should be replaced with actual logic to calculate total hours
    setTotalHours(fetchedHours);
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
