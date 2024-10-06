import React, { useState } from "react";
import './Modal.css';

const AddVisitor = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); // New state for Phone Number
  const [prisonerId, setPrisonerId] = useState(''); // New state for Prisoner ID
  const [date, setDate] = useState(''); // New state for Date
  const [time, setTime] = useState(''); // New state for Time

  const handleSubmit = async (e) => {
    e.preventDefault();
    const visitorData = { name, phoneNumber, prisonerId, date, time };

    try {
      const response = await fetch('http://localhost:5000/add_visitor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(visitorData),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message); // Show success message
        // Reset form fields to initial state after successful addition
        setName('');
        setPhoneNumber('');
        setPrisonerId('');
        setDate('');
        setTime('');
      } else {
        alert(result.message); // Show error message
      }
    } catch (error) {
      alert("Error adding visitor: " + error.message); // Show error alert
    }
  };

  return (
    <div className="modal-content">
      <h2>Add Visitor</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />

        <label>Phone Number:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
        />

        <label>Prisoner ID:</label>
        <input
          type="text"
          value={prisonerId}
          onChange={(e) => setPrisonerId(e.target.value)}
          placeholder="Enter Prisoner ID"
        />

        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddVisitor;