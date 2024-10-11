import React, { useState } from "react";
import './Modal.css';

const DeleteWork= ({ fetchData }) => {
  const [JobID, setJobID] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/delete_job', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ JobID }),
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
        <label>WorkID:</label>
        <input
          type="text"
          value={JobID}
          onChange={(e) => setJobID(e.target.value)}
          placeholder="Enter WorkID of Workto Delete"
        />
        <button type="submit">Delete</button>
      </form>
      {message && <p>{message}</p>} {/* Display success/error message */}
    </div>
  );
};

export default DeleteWork;
