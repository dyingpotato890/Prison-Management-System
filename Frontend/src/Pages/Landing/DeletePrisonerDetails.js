import React, { useState } from "react";
import './Modal.css';

const DeletePrisoner = () => {
  const [aadharNumber, setAadharNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/delete-prisoner-details', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ aadharNumber }), // Send Aadhar Number in the request body
      });

      if (response.ok) {
        setMessage('Prisoner deleted successfully!');
      } else {
        setMessage('Failed to delete prisoner. Please check the Aadhar Number.');
      }
    } catch (error) {
      console.error('Error deleting prisoner:', error);
      setMessage('An error occurred while deleting the prisoner.');
    }
  };

  return (
    <div className="modal-content">
      <h2>Delete Prisoner</h2>
      <form onSubmit={handleSubmit}>
        <label>Aadhar Number:</label>
        <input
          type="text"
          value={aadharNumber}
          onChange={(e) => setAadharNumber(e.target.value)}
          placeholder="Enter Aadhar Number of prisoner to delete"
        />
        <button type="submit">Delete</button>
      </form>
      {message && <p>{message}</p>} {/* Display success/error message */}
    </div>
  );
};

export default DeletePrisoner;
