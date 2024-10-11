import React, { useState } from "react";
import './Modal.css';
import axios from 'axios';

const AddPrisoner = ({ fetchData }) => { //testing
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [crimeId, setCrimeId] = useState('');
  const [entryDate, setEntryDate] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const prisonerData = { id, name, age, aadhar, crimeId, entryDate, releaseDate };

    try {
      const response = await axios.post('/add_prisoner', prisonerData);
      if (response.status === 200) {
        fetchData();
        alert('Prisoner added successfully!');
        // Clear form fields after success
        setId('');
        setName('');
        setAge('');
        setAadhar('');
        setCrimeId('');
        setEntryDate('');
        setReleaseDate('');
      } else {
        alert('Failed to add prisoner.');
      }
    } catch (error) {
      console.error("Error adding prisoner: ", error);
      alert('Failed to add prisoner.');
    }
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
          placeholder="Enter Name"
        />

        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter Age"
        />

        <label>Aadhar No:</label>
        <input
          type="text"
          value={aadhar}
          onChange={(e) => setAadhar(e.target.value)}
          placeholder="Enter Aadhar No"
        />

        <label>Crime ID:</label>
        <input
          type="text"
          value={crimeId}
          onChange={(e) => setCrimeId(e.target.value)}
          placeholder="Enter Crime ID"
        />

        <label>Entry Date:</label>
        <input
          type="date"
          value={entryDate}
          onChange={(e) => setEntryDate(e.target.value)}
        />

        <label>Release Date:</label>
        <input
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddPrisoner;