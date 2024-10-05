import React, { useState } from "react";
import './Modal.css';

const UpdatePrisoner = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [crimeId, setCrimeId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update prisoner logic here
    console.log('Updating prisoner with ID', id, 'to name', name, 'age', age, 'crime ID', crimeId);
  };

  return (
    <div className="modal-content">
      <h2>Update Prisoner Details</h2>
      <form onSubmit={handleSubmit}>
        <label>ID:</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter ID"
        />
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter new name"
        />
        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter new age"
        />
        <label>Crime ID:</label>
        <input
          type="text"
          value={crimeId}
          onChange={(e) => setCrimeId(e.target.value)}
          placeholder="Enter new crime ID"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdatePrisoner;
