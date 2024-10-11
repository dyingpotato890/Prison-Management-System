import React, { useMemo, useState, useEffect } from "react";
import { useTable } from 'react-table'; 
import axios from 'axios'; // Make sure to install axios
import './VisitorTable.css'; // Import the CSS file
import AddVisitor from "./AddVisitor";
import DeleteVisitor from "./DeleteVisitor";
import Modal from "./Modal";

function VisitorDetails() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false); // State to show/hide modal
    const [activeOperation, setActiveOperation] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/visitors');
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
        { Header: "Visitor Name", accessor: "visitor_name" },
        { Header: "Phone Number", accessor: "phone_number" },
        { Header: "Prisoner Name", accessor: "prisoner_name" },
        { Header: "Date", accessor: "date" },
        { Header: "Time", accessor: "time" },
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
                <h1>Visitor Table</h1>
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
                <button className="Add" onClick={() => handleOpenModal('add')}>Add Visitor</button>
                <button className="Delete" onClick={() => handleOpenModal('delete')}>Delete Visitor</button>
            </div>

            {showModal && (
                <Modal onClose={handleCloseModal}>
                    {activeOperation === 'add' && <div><AddVisitor/></div>}
                    {activeOperation === 'delete' && <div><DeleteVisitor/></div>}
                </Modal>
            )}
        </div>
    );
}

export default VisitorDetails;