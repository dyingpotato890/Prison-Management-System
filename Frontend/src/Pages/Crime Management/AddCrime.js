import React, { useState } from "react";
import '../Modal/Modal';
import axios from 'axios';

const AddCrime = ({ fetchData }) => {
  const [crimeID, setId] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const crimeData = { crimeID, desc };

    try {
      const response = await axios.post('/add_crime', crimeData);
      if (response.status === 200) {
        fetchData();
        alert('Crime added successfully!');
        // Clear form fields after success
        setId('');
        setDesc('');
      } else {
        alert('Failed to add crime.');
      }
    } catch (error) {
      console.error("Error adding crime: ", error);
      alert('Failed to add crime.');
    }
  };

  return (
    <div className="modal-content">
      <h2>Add Crime</h2>
      <form onSubmit={handleSubmit}>
        <label>Crime ID:</label>
        <input
          type="number"
          value={crimeID}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter Crime ID"
        />


        <label>Crime Description:</label>
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Crime Description"
        />


        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddCrime;