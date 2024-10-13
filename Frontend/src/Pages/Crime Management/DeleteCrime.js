import React, { useState } from "react";
import '../Modal/Modal';

const DeleteCrime = ({ fetchData }) => {
  const [crimeID, setCrimeID] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://prison-management-system-bmxy.onrender.com/delete_crime', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ crimeID }),
      });

      if (response.ok) {
        fetchData();
        setMessage('Crime deleted successfully!');
      } else {
        setMessage('Failed to delete crime. Please check the crime ID.');
      }
    } catch (error) {
      console.error('Error deleting crime:', error);
      setMessage('An error occurred while deleting the crime.');
    }
  };

  return (
    <div className="modal-content">
      <h2>Delete Crime</h2>
      <form onSubmit={handleSubmit}>
        <label>Crime ID:</label>
        <input
          type="text"
          value={crimeID}
          onChange={(e) => setCrimeID(e.target.value)}
          placeholder="Enter Crime ID of Crime to Delete"
        />
        <button type="submit">Delete</button>
      </form>
      {message && <p>{message}</p>} {/* Display success/error message */}
    </div>
  );
};

export default DeleteCrime;
