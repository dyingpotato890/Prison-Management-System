import React, { useState } from "react";
import './Modal.css';
import axios from 'axios';

const AddJob = ({ fetchData }) => {
  const [jobID, setId] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const jobData = { jobID, desc };

    try {
      const response = await axios.post('/add_job', jobData);
      if (response.status === 200) {
        fetchData();
        alert('Job added successfully!');
        // Clear form fields after success
        setId('');
        setDesc('');
      } else {
        alert('Failed to add Job.');
      }
    } catch (error) {
      console.error("Error adding Job: ", error);
      alert('Failed to add Job.');
    }
  };

  return (
    <div className="modal-content">
      <h2>Add Job</h2>
      <form onSubmit={handleSubmit}>
        <label>Job ID:</label>
        <input
          type="number"
          value={jobID}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter Job ID"
        />


        <label>Job Description:</label>
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Job Description"
        />


        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddJob;