import React, { useMemo, useState, useEffect } from "react";
import { useTable } from 'react-table'; 
import axios from 'axios'; // Make sure to install axios
import './JobManagement.css'; // Import the CSS file
import AddJob from "./AddJob";
import DeleteJob from "./DeleteJOb.js";
import Modal from "../Modal/Modal";

function JobDetails() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false); // State to show/hide modal
    const [activeOperation, setActiveOperation] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('/job-details');
            setData(response.data);
        } catch (error) {
            setError("Error fetching data. Please try again.");
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const columns = useMemo(() => [
        { Header: "Job ID", accessor: "job_id" },
        { Header: "Job Description", accessor: "job_description" },
        { Header: "Work Start", accessor: "work_start" },
        { Header: "Work End", accessor: "work_end" },
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
        setActiveOperation(operation);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setActiveOperation(null);
    };

    return (
        <div className="App">
            <div className="table-container">
                <h1>Job Table</h1>
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
            <div className="Operations">
                <button className="Add" onClick={() => handleOpenModal('add')}>Add Job Details</button>
                <button className="Delete" onClick={() => handleOpenModal('delete')}>Delete Job Details</button>
            </div>

            {showModal && (
                <Modal onClose={handleCloseModal}>
                    {activeOperation === 'add' && <div><AddJob fetchData={fetchData}/></div>}
                    {activeOperation === 'delete' && <div><DeleteJob fetchData={fetchData}/></div>}
                </Modal>
            )}
        </div>
    );
}

export default JobDetails;