import React, { useState } from "react";
import './Modal.css';

const DeleteCell = () => {
  const [CellName, setCellName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/delete_cell', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cell_number: CellName }),
      });

      const data = await response.json();  // Get the message from the backend

      if (response.ok) {
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
        <label>Cell Name:</label>
        <input
          type="text"
          value={CellName}
          onChange={(e) => setCellName(e.target.value)}
          placeholder="Enter Cell Name to Delete"
        />
        <button type="submit">Delete</button>
      </form>
      {message && <p>{message}</p>}  {/* Display success/error message */}
    </div>
  );
};

export default DeleteCell;