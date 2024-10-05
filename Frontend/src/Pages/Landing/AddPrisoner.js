import React, { useState } from "react";
import './Modal.css';

const AddPrisoner = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [age, setAge] = useState('');
  const [crimeId, setCrimeId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add prisoner logic here
    console.log('Adding prisoner', { id, name, aadhar, age, crimeId });
  };

  return (
    <div className="modal-content">
      <h2>Add Prisoner</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />

        <label>ID:</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter ID"
        />

        <label>Aadhar No:</label>
        <input
          type="text"
          value={aadhar}
          onChange={(e) => setAadhar(e.target.value)}
          placeholder="Enter Aadhar No"
        />

        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter Age"
        />

        <label>Crime ID:</label>
        <input
          type="text"
          value={crimeId}
          onChange={(e) => setCrimeId(e.target.value)}
          placeholder="Enter Crime ID"
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddPrisoner;
