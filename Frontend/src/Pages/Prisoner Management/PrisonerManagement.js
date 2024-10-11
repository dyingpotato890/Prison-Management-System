import React, { useEffect, useMemo, useState } from "react";
import { useTable, useGlobalFilter } from 'react-table';
import './PrisonerManagement.css';
import UpdatePrisoner from "./UpdatePrisoner";
import AddPrisoner from "./AddPrisoner";
import DeletePrisoner from "./DeletePrisoner";
import DeletePrisonerDetails from "./DeletePrisonerDetails";
import Modal from '../Modal/Modal';

function Prisoner_Management() {
  const [data, setData] = useState([]); // State to hold prisoner data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedPrisoner, setSelectedPrisoner] = useState(null); // State for selected prisoner details
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [searchBy, setSearchBy] = useState('id'); // Either 'name' or 'id'

  // Fetch prisoner data
  const fetchData = async () => {
    setLoading(true); // Set loading to true
    setError(null); // Clear previous errors
    try {
      const response = await fetch(`/prisoners`);
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
  }, []);

  // Filter data based on search term, allowing progressive filtering
  // Filter data based on search term
// Filter data based on search term
const filteredData = useMemo(() => {
  if (!searchTerm) return data; // If no search term, return all data

  return data.filter((prisoner) => {
    const prisonerId = parseInt(prisoner.prisoner_id, 10); // Convert prisoner_id to a number

    if (searchBy === 'id') {
      const searchId = parseInt(searchTerm, 10); // Convert searchTerm to a number

      // If searchTerm is less than 10, show only the exact match
      if (searchId < 10) {
        return prisonerId === searchId; // Exact match for IDs less than 10
      }

      // If searchTerm is greater than or equal to 10, show only IDs greater than or equal to 10
      return prisonerId >= 10 && prisonerId.toString().startsWith(searchTerm);
    } else if (searchBy === 'name') {
      // Match if the name contains the search term, ignoring case
      return prisoner.name.toLowerCase().startsWith(searchTerm.toLowerCase());
    }

    return true;
  });
}, [data, searchTerm, searchBy]);

  // Fetch specific prisoner details when a row is clicked
  const fetchPrisonerDetails = async (prisonerId) => {
    try {
      const response = await fetch(`/prisoner_details/${prisonerId}`);
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
        Header: "NAME",
        accessor: "name",
      },
      {
        Header: "CRIME DESCRIPTION",
        accessor: "description",
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
  } = useTable({ columns, data: filteredData }); // Use the filtered data for the table

  // Handle row click
  const handleRowClick = (row) => {
    fetchPrisonerDetails(row.original.prisoner_id);
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
      <div className="table-container">
        <h1>Prisoner Table</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder={`Search by ${searchBy === 'id' ? 'ID' : 'Name'}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
       

      

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>Error: {error}</p>
        ) : (
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
        )}
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
          {activeOperation === 'add' && <AddPrisoner fetchData={fetchData}/>}
          {activeOperation === 'delete' && <DeletePrisoner fetchData={fetchData}/>}
          {activeOperation === 'deleteDetails' && <DeletePrisonerDetails fetchData={fetchData}/>}
          {activeOperation === 'update' && <UpdatePrisoner fetchData={fetchData}/>}
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
