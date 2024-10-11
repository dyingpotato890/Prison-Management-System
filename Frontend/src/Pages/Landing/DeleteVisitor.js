import React, { useState } from "react";
import './Modal.css';

const DeleteVisitor = ({ fetchData }) => {
  const [visitorName, setVisitorName] = useState('');
  const [prisonerId, setPrisonerId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('/delete_visitor', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ visitorName, prisonerId, date, time }),
    });

    const result = await response.json();
    setMessage(result.message);
    alert(result.message);

    if (response.ok) {
      // Reset the fields after successful deletion
      fetchData();
      setVisitorName('');
      setPrisonerId('');
      setDate('');
      setTime('');
    }
  };

  return (
    <div className="modal-content">
      <h2>Delete Visitor</h2>
      <form onSubmit={handleSubmit}>
        <label>Visitor Name:</label>
        <input
          type="text"
          value={visitorName}
          onChange={(e) => setVisitorName(e.target.value)}
          placeholder="Enter Visitor Name"
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

        <button type="submit">Delete</button>
      </form>
    </div>
  );
};

export default DeleteVisitor;