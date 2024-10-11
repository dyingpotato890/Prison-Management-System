import React, { useState } from "react";
import '../Modal/Modal';

const UpdatePrisoner = ({ fetchData }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [crimeId, setCrimeId] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [step, setStep] = useState(1); // Step 1: Ask for ID, Step 2: Ask for other details

  const handleIdSubmit = (e) => {
    e.preventDefault();
    setStep(2); // Move to step 2 after entering ID
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    // Update prisoner logic here
    console.log('Updating prisoner with ID', id, 'to name', name, 'age', age, 'crime ID', crimeId, 'release date', releaseDate);
  };

  return (
    <div className="modal-content">
      {step === 1 ? (
        <>
          <h2>Enter Prisoner ID</h2>
          <form onSubmit={handleIdSubmit}>
            <label>ID:</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter ID"
            />
            <button type="submit">Next</button>
          </form>
        </>
      ) : (
        <>
          <h2>Updating details of ID: {id}</h2>
          <form onSubmit={handleDetailsSubmit}>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter new name"
            />
            <label>Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter new age"
            />
            <label>Crime ID:</label>
            <input
              type="text"
              value={crimeId}
              onChange={(e) => setCrimeId(e.target.value)}
              placeholder="Enter new crime ID"
            />
            <label>Release Date:</label>
            <input
              type="date"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
            />
            <button type="submit">Update</button>
          </form>
        </>
      )}
    </div>
  );
};

export default UpdatePrisoner;
