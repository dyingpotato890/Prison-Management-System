import React, { useState } from "react";
import '../Modal/Modal';

const UpdatePrisoner = ({ fetchData }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [crimeId, setCrimeId] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [step, setStep] = useState(1); // Step 1: Ask for ID, Step 2: Ask for other details

  const handleIdSubmit = async (e) => {
    e.preventDefault();
    
    console.log(`Fetching details for prisoner ID: ${id}`);  // Debugging line
    
    try {
      const response = await fetch(`/prisoner-update/${id}`);
      const data = await response.json();
  
      console.log(`Response from server for prisoner ID ${id}:`, data);  // Debugging line
  
      if (response.ok) {
        setStep(2); // Proceed to step 2 if prisoner exists
        console.log(`Prisoner ID ${id} found. Moving to update details.`);  // Debugging line
      } else {
        alert('Prisoner not found!');
        console.log(`Prisoner ID ${id} does not exist.`);  // Debugging line
      }
    } catch (error) {
      console.error('Error fetching prisoner data:', error);
    }
  };
  
  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    
    const updatedDetails = {
      prisoner_id: id,
      name,
      age,
      crime_id: crimeId,
      release_date: releaseDate
    };
  
    console.log(`Submitting update for prisoner ID: ${id}`, updatedDetails);  // Debugging line
  
    try {
      const response = await fetch(`/prisoner-update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedDetails)
      });
  
      const data = await response.json();
      console.log(`Response from server after updating prisoner ID ${id}:`, data);  // Debugging line
  
      if (response.ok) {
        alert('Prisoner details updated successfully!');
      } else {
        alert('Error updating prisoner:', data.message);
      }
    } catch (error) {
      console.error('Error updating prisoner data:', error);
    }
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
