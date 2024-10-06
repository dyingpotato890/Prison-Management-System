import React, { useMemo, useState, useEffect } from "react";
import { useTable } from 'react-table'; 
import axios from 'axios'; // Make sure to install axios
import './StaffManagement.css';

function StaffDetails() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/staff');
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
        { Header: "Staff Name", accessor: "staff_name" },
        { Header: "Phone Number", accessor: "phone_number" },
        { Header: "Staff ID", accessor: "staff_id" }
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    if (loading) {
        return <div className="loading">Loading...</div>; // Consider using a spinner here
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

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
        </div>
    );
}

export default StaffDetails;