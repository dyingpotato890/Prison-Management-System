import React, { useState } from "react";
import '../Modal/Modal';

const DeletePrisoner = ({ fetchData }) => {
  const [prisonerID, setPrisonerId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/delete-prisoner', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prisonerID }),
      });

      if (response.ok) {
        fetchData();
        setMessage('Prisoner deleted successfully!');
      } else {
        setMessage('Failed to delete prisoner. Please check the Prisoner ID.');
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
        <label>Prisoner ID:</label>
        <input
          type="text"
          value={prisonerID}
          onChange={(e) => setPrisonerId(e.target.value)}
          placeholder="Enter Prisoner ID of Prisoner to Delete"
        />
        <button type="submit">Delete</button>
      </form>
      {message && <p>{message}</p>} {/* Display success/error message */}
    </div>
  );
};

export default DeletePrisoner;
