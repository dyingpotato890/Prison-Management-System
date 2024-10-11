import React, { useState } from "react";
import './Modal.css';
import axios from 'axios';

const AddStaff = ({ fetchData }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phonenumber, setPhno] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const staffData = { id, name, age, phonenumber, role };

    try {
      const response = await axios.post('/add_staff', staffData);
      if (response.status === 200) {
        fetchData();
        alert('Staff added successfully!');
        // Clear form fields after success
        setId('');
        setName('');
        setAge('');
        setPhno('');
        setRole('');
      } else {
        alert('Failed to add staff.');
      }
    } catch (error) {
      console.error("Error adding staff: ", error);
      alert('Failed to add staff.');
    }
  };

  return (
    <div className="modal-content">
      <h2>Add Staff</h2>
      <form onSubmit={handleSubmit}>
        <label>ID:</label>
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter ID"
        />
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

        <label>Phone No:</label>
        <input
          type="text"
          value={phonenumber}
          onChange={(e) => setPhno(e.target.value)}
          placeholder="Enter Phone No"
        />

        <label>Role:</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Enter Role"
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddStaff;