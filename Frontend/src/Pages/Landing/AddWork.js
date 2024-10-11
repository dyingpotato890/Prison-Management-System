import React, { useState } from "react";
import './Modal.css';
import axios from 'axios';

const AddWork = ({ fetchData }) => {
  const [WorkID, setId] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const WorkData = { WorkID, desc };

    try {
      const response = await axios.post('/add_Work', WorkData);
      if (response.status === 200) {
        fetchData();
        alert('Work added successfully!');
        // Clear form fields after success
        setId('');
        setDesc('');
      } else {
        alert('Failed to add Work.');
      }
    } catch (error) {
      console.error("Error adding Work: ", error);
      alert('Failed to add Work.');
    }
  };

  return (
    <div className="modal-content">
      <h2>Add Work</h2>
      <form onSubmit={handleSubmit}>
        <label>Work ID:</label>
        <input
          type="number"
          value={WorkID}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter Work ID"
        />


        <label>Work Description:</label>
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Work Description"
        />


        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddWork;