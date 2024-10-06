import React, { useEffect, useMemo, useState } from "react";
import { useTable, useGlobalFilter } from 'react-table';
import './PrisonerManagement.css';
import UpdatePrisoner from "./UpdatePrisoner";
import AddPrisoner from "./AddPrisoner";
import DeletePrisoner from "./DeletePrisoner";
import DeletePrisonerDetails from "./DeletePrisonerDetails";
import Modal from './Modal';

function Prisoner_Management() {
  const [data, setData] = useState([]); // State to hold prisoner data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedPrisoner, setSelectedPrisoner] = useState(null); // State for selected prisoner details
  const [globalFilter, setGlobalFilter] = useState(''); // State for search

  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [searchBy, setSearchBy] = useState('id'); // Either 'name' or 'id'

  // Fetch prisoner data
  const fetchData = async () => {
    setLoading(true); // Set loading to true
    try {
      // Adjust the fetch URL based on the search criteria
      const response = await fetch(`http://localhost:5000/prisoners?${searchBy}=${searchTerm}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result); // Set the data state
    } catch (error) {
      setError(error.message); // Set error state
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, [searchTerm, searchBy]); // Refetch when search term or search criteria change

  // Fetch specific prisoner details when a row is clicked
  const fetchPrisonerDetails = async (prisonerId) => {
    try {
      const response = await fetch(`http://localhost:5000/prisoner_details/${prisonerId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setSelectedPrisoner(result); // Set selected prisoner details
    } catch (error) {
      setError(error.message);
    }
  };

  // Define table columns
  const columns = useMemo(
    () => [
      {
        Header: "PRISONER ID",
        accessor: "prisoner_id", // Match the field names
      },
      {
        Header: "AADHAR NUMBER",
        accessor: "aadhar_number",
      },
      {
        Header: "CRIME ID",
        accessor: "crime_id",
      },
      {
        Header: "ENTER DATE",
        accessor: "enter_date",
      },
      {
        Header: "RELEASE DATE",
        accessor: "release_date",
      }
    ],
    []
  );

  // Table hooks for react-table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter: setTableGlobalFilter, // Use react-table's global filter
  } = useTable({ columns, data }, useGlobalFilter);

  // Sync search input with table's global filter
  useEffect(() => {
    setTableGlobalFilter(globalFilter);
  }, [globalFilter, setTableGlobalFilter]);

  // Handle filter selection change (name or id)
  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
    setSearchTerm(''); // Reset search term when changing criteria
  };

  // Handle row click
  const handleRowClick = (row) => {
    fetchPrisonerDetails(row.original.prisoner_id); // Fetch prisoner details when a row is clicked
  };

  const [activeOperation, setActiveOperation] = useState(null); // State to manage the current operation (add, delete, update)
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleOpenModal = (operation) => {
    setActiveOperation(operation); // Set the active operation
    setShowModal(true); // Open the modal
  };
  
  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    setActiveOperation(null); // Reset the active operation
  };  

  return (
    <div className="App">
      {/* Prisoner Table */}
      <div className="table-container">
        <h1>Prisoner Table</h1>
        
        {/* Search Bar */}
        <input
          type="text"
          placeholder={`Search by ${searchBy === 'id' ? 'ID' : 'Aadhar Number'}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select value={searchBy} onChange={handleSearchByChange} className="options">
          <option value="id">ID</option>
          <option value="aadhar">Aadhar Number</option>
        </select>
        <button className="search-button" onClick={fetchData}>Search</button>
        
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()} onClick={() => handleRowClick(row)}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Operations */}
      <div className="Operations">
        <button className="Add" onClick={() => handleOpenModal('add')}>Add Prisoner</button>
        <button className="Delete" onClick={() => handleOpenModal('delete')}>Delete Prisoner</button>
        <button className="Delete" onClick={() => handleOpenModal('deleteDetails')}>Delete Prisoner Details</button>
        <button className="Update" onClick={() => handleOpenModal('update')}>Update details</button>
      </div>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          {activeOperation === 'add' && <AddPrisoner />}
          {activeOperation === 'delete' && <DeletePrisoner />}
          {activeOperation === 'deleteDetails' && <DeletePrisonerDetails />}
          {activeOperation === 'update' && <UpdatePrisoner />}
        </Modal>
      )}

      {/* Selected Prisoner Details */}
      <div className="prisonermanagement">
        <h1>Selected Prisoner Details</h1>

        {selectedPrisoner ? (
          <ul className="prisoner-list">
            <li><strong>Prisoner ID:</strong> {selectedPrisoner.prisoner_id}</li>
            <li><strong>Aadhar Number:</strong> {selectedPrisoner.aadhar_number}</li>
            <li><strong>Name:</strong> {selectedPrisoner.name}</li>
            <li><strong>Age:</strong> {selectedPrisoner.age}</li>
            <li><strong>Convictions:</strong> {selectedPrisoner.convictions}</li>
            <li><strong>Crime ID:</strong> {selectedPrisoner.crime_id}</li>
            <li><strong>Enter Date:</strong> {selectedPrisoner.enter_date}</li>
            <li><strong>Release Date:</strong> {selectedPrisoner.release_date}</li>
          </ul>
        ) : (
          <p className="para1">Please select a prisoner to view details</p>
        )}
      </div>
    </div>
  );
}

export default Prisoner_Management;
