import React, { useEffect, useMemo, useState } from "react";
import { useTable } from 'react-table';
import './PrisonerManagement.css';
import UpdatePrisoner from "./UpdatePrisoner";
import AddPrisoner from "./AddPrisoner";
import DeletePrisoner from"./DeletePrisoner";
import Modal from './Modal';


function Prisoner_Management() {
  const [data, setData] = useState([]); // State to hold prisoner data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch prisoner data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/prisoners");
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
    fetchData();
  }, []);

  // Define table columns
  const columns = useMemo(
    () => [
      {
        Header: "PRISONER ID",
        accessor: "PRISONER_ID", // Adjust the accessor to match the field names
      },
      {
        Header: "AADHAR NUMBER",
        accessor: "AADHAR_NUMBER",
      },
      {
        Header: "CRIME ID",
        accessor: "CRIME_ID",
      },
      {
        Header: "ENTER DATE",
        accessor: "ENTER_DATE",
      },
      {
        Header: "RELEASE DATE",
        accessor: "RELEASE_DATE",
      },
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
  } = useTable({ columns, data });

  // State for prisoners (you can extend this as needed)
  const [prisoners, setPrisoners] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Sam Johnson' },
  ]);

  // State for search term and search filter (by name or id)
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('name'); // Either 'name' or 'id'
  const [showModal, setShowModal] = useState(false);
  const [activeOperation, setActiveOperation] = useState(null);

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle filter selection change (name or id)
  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
  };

  // Filter prisoners based on search term and search by option
  const filteredPrisoners = prisoners.filter((prisoner) => {
    if (searchBy === 'name') {
      return prisoner.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchBy === 'id') {
      return prisoner.id.toString().includes(searchTerm);
    }
    return false;
  });
    const handleOpenModal = (operation) => {
      setActiveOperation(operation);
      setShowModal(true);
    }
    const handleCloseModal =() =>{
      setShowModal(false);
      setActiveOperation(null);
    }

  return (
    <div className="App">
      {/* Prisoner Table */}
      <div className="table-container">
        <h1>Prisoner Table</h1>
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
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
  
      {/* Search and Filter Prisoners */}
      <div className="prisonermanagement">
        <h1>Prisoner List</h1>
  
        {/* Search bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder={`Search by ${searchBy}`}
            value={searchTerm}
            onChange={handleSearch}
          />
          <select value={searchBy} onChange={handleSearchByChange}>
            <option value="name">Name</option>
            <option value="id">ID</option>
          </select>
        </div>
  
        {/* Filtered Prisoner List */}
        <ul className="prisoner-list">
          {filteredPrisoners.map((prisoner) => (
            <li key={prisoner.id}>
              {prisoner.id}: {prisoner.name}
            </li>
          ))}
        </ul>
  
        {/* Operations */}
        <div className="Operations">
        <button className="Add" onClick={() => handleOpenModal('add')}>Add Prisoner</button>
        <button className="Delete" onClick={() => handleOpenModal('delete')}>Delete Prisoner</button>
        <button className="Update" onClick={() => handleOpenModal('update')}>Update details</button>
      </div>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          {activeOperation === 'add' && <AddPrisoner />}
          {activeOperation === 'delete' && <DeletePrisoner />}
          {activeOperation === 'update' && <UpdatePrisoner />}
        </Modal>)}
      </div>
    </div>
  );
}

export default Prisoner_Management;
