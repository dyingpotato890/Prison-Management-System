import React, { useMemo, useState, useEffect } from "react";
import { useTable } from 'react-table'; 
import axios from 'axios';
import './WorkManagement.css';
import AddWork from "./AddWork";
import DeleteWork from "./DeleteWork.js";
import TotalWork from "./TotalWork.js";
import Modal from "../Modal/Modal";

function WorkDetails() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false); // State to show/hide modal
    const [activeOperation, setActiveOperation] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://prison-management-system-bmxy.onrender.com/work-details');
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
        { Header: "Prisoner ID", accessor: "prisoner_id" },
        { Header: "Job Description", accessor: "job_desc" },
        { Header: "Hours Worked", accessor: "working-hours" },
   
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
                <h1>Work Table</h1>
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
                <button className="Add" onClick={() => handleOpenModal('add')}>Add Work Details</button>
                <button className="Delete" onClick={() => handleOpenModal('delete')}>Delete Work Details</button>
                <button className="Total" onClick={() => handleOpenModal('totalhrs')}>Get Total Hours</button>
            </div>

            {showModal && (
                <Modal onClose={handleCloseModal}>
                    {activeOperation === 'add' && <div><AddWork fetchData={fetchData}/></div>}
                    {activeOperation === 'delete' && <div><DeleteWork fetchData={fetchData}/></div>}
                    {activeOperation === 'totalhrs' && <div><TotalWork fetchData={fetchData}/></div>}
                </Modal>
            )}
        </div>
    );
}

export default WorkDetails;