import React, { useState } from "react";
import './Modal.css';

const DeletePrisonerDetails = () => {
  const [aadharNumber, setAadharNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/delete-prisoner-details', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ aadharNumber }), // Send Aadhar Number in the request body
      });

      if (response.ok) {
        alert('Prisoner deleted successfully!');  // Alert on success
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to delete prisoner. Please check the Aadhar Number.');  // Alert on failure
      }
    } catch (error) {
      console.error('Error deleting prisoner:', error);
      alert('An error occurred while deleting the prisoner.');  // Alert on catch error
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
    </div>
  );
};

export default DeletePrisonerDetails;