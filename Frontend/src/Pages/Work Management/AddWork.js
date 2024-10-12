import React, { useState } from "react";
import '../Modal/Modal';
import axios from 'axios';

const AddWork = ({ fetchData }) => {
  const [jobID, setId] = useState('');
  const [prisonerID, setPID] = useState('');
  const [addHours, setHours] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const WorkData = { jobID, prisonerID, addHours };

    try {
      const response = await axios.post('/add_work', WorkData);
      if (response.status === 200) {
        fetchData();
        alert('Work added successfully!');
        // Clear form fields after success
        setId('');
        setPID('');
        setHours('');
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
        <label>Job ID:</label>
        <input
          type="number"
          value={jobID}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter Job ID"
        />

        <label>Prisoner ID:</label>
        <input
          type="number"
          value={prisonerID}
          onChange={(e) => setPID(e.target.value)}
          placeholder="Enter Prisoner ID"
        />
        

        <label>Add Hours:</label>
        <input
          type="number"
          value={addHours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="Enter Hours To Be Added"
        />
        
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddWork;