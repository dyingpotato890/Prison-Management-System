import React, { useState } from "react";
import './Modal.css';


const DeletePrisoner = () => {
  const [id, setId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Delete prisoner logic here
    console.log('Deleting prisoner with ID', id);
  };

  return (
    <div className="modal-content">
      <h2>Delete Prisoner</h2>
      <form onSubmit={handleSubmit}>
        <label>ID:</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter ID of prisoner to delete"
        />
        <button type="submit">Delete</button>
      </form>
    </div>
  );
};

export default DeletePrisoner;
