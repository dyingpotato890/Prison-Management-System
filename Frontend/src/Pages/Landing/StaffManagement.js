import React, { useMemo, useState, useEffect } from "react";
import { useTable } from 'react-table'; 
import axios from 'axios'; // Make sure to install axios
import './StaffManagement.css';
import Modal from './Modal';
import AddStaff from './AddStaff';
import DeleteStaff from './DeleteStaff';
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';

function StaffDetails() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeOperation, setActiveOperation] = useState(null); // State to manage the current operation (add, delete, update)
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/staff');
                setData(response.data);
            } catch (error) {
                setError("Error fetching data. Please try again.");
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const columns = useMemo(() => [
        { Header: "Staff ID", accessor: "staff_id" },
        { Header: "Staff Name", accessor: "name" },
        { Header: "Phone Number", accessor: "phone_number" },
        { Header: "Age", accessor: "age" },
        { Header: "Role", accessor: "role" }
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    if (loading) {
        return <div className="loader"></div>; // Consider using a spinner here
    }

    if (error) {
        return <div className="error">{error}</div>;
    }


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
                <h1>Staff Table</h1>
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()} className="table-header">
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => (
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
        <button className="Add" onClick={() => handleOpenModal('add')}>Add Staff</button>
        <button className="Delete" onClick={() => handleOpenModal('delete')}>Delete Staff</button>   
        <button className="Add" onClick={() => handleOpenModal('addUser')}>Add User</button>
        <button className="Delete" onClick={() => handleOpenModal('deleteUser')}>Delete User</button>   
        
      </div>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          {activeOperation === 'add' && <AddStaff />}
          {activeOperation === 'delete' && <DeleteStaff />}
          {activeOperation === 'addUser' && <AddUser />}
          {activeOperation === 'deleteUser' && <DeleteUser />}
        </Modal>
      )}
        </div>
    );
}

export default StaffDetails;