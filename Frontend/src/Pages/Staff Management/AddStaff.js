import React, { useState } from "react";
import '../Modal/Modal';
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
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="Warden">Warden</option>
          <option value="Deputy Warden">Deputy Warden</option>
          <option value="Chief Security Officer">Chief Security Officer</option>
          <option value="Medical Officer">Medical Officer</option>
          <option value="Administrative Officer">Administrative Officer</option>
          <option value="Rehabilitation Officer">Rehabilitation Officer</option>
          <option value="Education Coordinator">Education Coordinator</option>
          <option value="Case Manager">Case Manager</option>
          <option value="Program Director">Program Director</option>
          <option value="Parole Officer">Parole Officer</option>
          <option value="Food Service Manager">Food Service Manager</option>
          <option value="Maintenance Supervisor">Maintenance Supervisor</option>
          <option value="Chaplain">Chaplain</option>
          <option value="Recreation Specialist">Recreation Specialist</option>
          <option value="IT Specialist">IT Specialist</option>
          <option value="Human Resources Manager">Human Resources Manager</option>
          <option value="Training Officer">Training Officer</option>
          <option value="Legal Advisor">Legal Advisor</option>
          <option value="Financial Officer">Financial Officer</option>
          <option value="Library Technician">Library Technician</option>
          <option value="Correctional Officer">Correctional Officer</option>
        </select>

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddStaff;