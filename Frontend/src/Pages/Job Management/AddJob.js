import React, { useState } from "react";
import '../Modal/Modal';
import axios from 'axios';

const AddJob = ({ fetchData }) => {
  const [jobID, setId] = useState('');
  const [desc, setDesc] = useState('');
  const [startHour, setStartHour] = useState('');
  const [endHour, setEndHour] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const jobData = { jobID, desc, startHour, endHour };

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

        <label>Start Hour:</label>
        <input
          type="time"
          value={startHour}
          onChange={(e) => setStartHour(e.target.value)}
          placeholder="Start Hour"
          />

        <label>End Hour:</label>
        <input
          type="time"
          value={endHour}
          onChange={(e) => setEndHour(e.target.value)}
          placeholder="End Hour"
          />

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddJob;