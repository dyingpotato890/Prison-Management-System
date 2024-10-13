import React, { useState } from "react";
import '../Modal/Modal';

const DeleteWork= ({ fetchData }) => {
  const [jobID, setJobID] = useState('');
  const [prisonerID, setPID] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://prison-management-system-bmxy.onrender.com/delete_work', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ JobID: jobID, PrisonerID: prisonerID }),
      });

      if (response.ok) {
        fetchData();
        setMessage('Work deleted successfully!');
      } else {
        setMessage('Failed to delete Job. Please check the WorkID.');
      }
    } catch (error) {
      console.error('Error deleting Job:', error);
      setMessage('An error occurred while deleting the Job.');
    }
  };

  return (
    <div className="modal-content">
      <h2>Delete Job</h2>
      <form onSubmit={handleSubmit}>
        <label>Job ID:</label>
        <input
          type="number"
          value={jobID}
          onChange={(e) => setJobID(e.target.value)}
          placeholder="Enter Job ID"
        />
        <label>Prisoner ID:</label>
        <input
          type="number"
          value={prisonerID}
          onChange={(e) => setPID(e.target.value)}
          placeholder="Enter Prisoner ID"
        />
        <button type="submit">Delete</button>
      </form>
      {message && <p>{message}</p>} {/* Display success/error message */}
    </div>
  );
};

export default DeleteWork;
