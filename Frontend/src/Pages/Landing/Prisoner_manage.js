import React, { useMemo, useRef } from "react";
import { useTable } from "react-table";
import fakeData from "../MOCK_DATA.json";
import "../Components/Prisoner_manage.css";

function PrisonerManagement() {
  const data = useMemo(() => {
    // Check if fakeData is properly loaded
    if (!fakeData || !Array.isArray(fakeData)) {
      console.error("Data is not an array:", fakeData);
      return [];
    }
    return fakeData;
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        accessor: "last_name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  // Check if columns and data are defined before rendering the table
  if (!columns || !data) {
    return <div>Error: Missing data or columns!</div>;
  }

  return (
    <div className="App">
      <div className="container">
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
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
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

export default PrisonerManagement;
