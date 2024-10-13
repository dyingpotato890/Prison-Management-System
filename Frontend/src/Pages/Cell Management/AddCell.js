import React, { useState } from "react";
import '../Modal/Modal';

const AddCell = (fetchData) => {
  const [CellName, setCellName] = useState('');
  const [prisonerId, setPrisonerId] = useState(''); // New state for Prisoner ID

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cellData = {CellName,  prisonerId};

    try {
      const response = await fetch('https://prison-management-system-bmxy.onrender.com/add_cell', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cellData),
      });

      const result = await response.json();
      if (response.ok) {
        fetchData(); // Fetch data again
        alert(result.message); // Show success message
        // Reset form fields to initial state after successful addition
        setCellName('');
        setPrisonerId('');
      } else {
        alert(result.message); // Show error message
      }
    } catch (error) {
      alert("Error adding cell: " + error.message); // Show error alert
    }
  };

  return (
    <div className="modal-content">
      <h2>Add Cell</h2>
      <form onSubmit={handleSubmit}>
        <label>Cell Number:</label>
        <input
          type="text"
          value={CellName}
          onChange={(e) => setCellName(e.target.value)}
          placeholder="Enter name"
        />

        <label>Prisoner id:</label>
        <input
          type="text"
          value={prisonerId}
          onChange={(e) => setPrisonerId(e.target.value)}
          placeholder="Enter prisoner id"
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddCell;