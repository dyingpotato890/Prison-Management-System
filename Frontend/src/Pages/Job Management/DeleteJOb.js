import React, { useState } from "react";
import '../Modal/Modal';

const DeleteJob = ({ fetchData }) => {
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
        setMessage('Job deleted successfully!');
      } else {
        setMessage('Failed to delete Job. Please check the Job ID.');
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
          type="text"
          value={JobID}
          onChange={(e) => setJobID(e.target.value)}
          placeholder="Enter Job ID of Job to Delete"
        />
        <button type="submit">Delete</button>
      </form>
      {message && <p>{message}</p>} {/* Display success/error message */}
    </div>
  );
};

export default DeleteJob;
