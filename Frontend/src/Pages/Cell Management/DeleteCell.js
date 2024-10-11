import React, { useState } from "react";
import '../Modal/Modal';

const DeleteCell = ({ fetchData }) => {
  const [CellName, setCellName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/delete_cell', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cell_number: CellName }),
      });

      const data = await response.json();  // Get the message from the backend

      if (response.ok) {
        fetchData();
        setMessage(data.message);  // Set the message based on the backend response
      } else {
        setMessage('Failed to delete cell. Please check the cell name.');
      }
    } catch (error) {
      console.error('Error deleting cell:', error);
      setMessage('An error occurred while deleting the cell.');
    }
  };

  return (
    <div className="modal-content">
      <h2>Delete Cell</h2>
      <form onSubmit={handleSubmit}>
        <label>Cell Number:</label>
        <input
          type="text"
          value={CellName}
          onChange={(e) => setCellName(e.target.value)}
          placeholder="Enter Cell Number to Delete"
        />
        <button type="submit">Delete</button>
      </form>
      {message && <p>{message}</p>}  {/* Display success/error message */}
    </div>
  );
};

export default DeleteCell;