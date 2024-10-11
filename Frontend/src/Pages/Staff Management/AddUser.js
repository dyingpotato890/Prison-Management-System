import React, { useState } from "react";
import '../Modal/Modal';
import axios from 'axios';

const AddUser = ({ fetchData }) => {
  const [id, setId] = useState('');
  const [password, setPass] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const staffData = { id, password };

    try {
      const response = await axios.post('/add_user', staffData);
      if (response.status === 200) {
        fetchData();
        alert('User added successfully!');
        // Clear form fields after success
        setId('');
        setPass('');
      } else {
        alert('Failed to add user.');
      }
    } catch (error) {
      console.error("Error adding staff: ", error);
      alert('Failed to add staff.');
    }
  };

  return (
    <div className="modal-content">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <label>ID:</label>
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter ID"
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Enter password"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddUser;