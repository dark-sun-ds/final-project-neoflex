import "./Table.css";
import React, { useCallback, useMemo, useState } from "react";
import ascending from "/src/assets/ascending.svg";
import descending from "/src/assets/descending.svg";
import { RowData } from "../../pages/LoanDocument/LoanDocument";

const Table: React.FC<{ data: RowData[] }> = ({ data }) => {
  const [sortColumn, setSortColumn] = useState<keyof RowData | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortedData = useMemo(() => {
    if (!sortColumn) return data;

    const newData = data ? [...data] : [];
    newData.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      let comparison = 0;

      if (typeof aValue === "number" && typeof bValue === "number") {
        comparison = aValue - bValue;
      } else if (typeof aValue === "string" && typeof bValue === "string") {
        if (sortColumn === "date") {
          const dateA = new Date(aValue);
          const dateB = new Date(bValue);
          comparison = dateA.getTime() - dateB.getTime();
        } else {
          comparison = aValue.localeCompare(bValue);
        }
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
    return newData;
  }, [sortColumn, sortDirection]);

  const handleSort = useCallback(
    (column: keyof RowData) => {
      if (sortColumn === column) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortColumn(column);
        setSortDirection("asc");
      }
    },
    [sortColumn, sortDirection]
  );

  const getSortIcon = (key: keyof RowData) => {
    return (
      <img
        className="sort-indicator"
        src={
          sortColumn !== key || sortDirection === "asc" ? ascending : descending
        }
        alt={sortDirection === "asc" ? "ascending" : "descending"}
      />
    );
  };

  return (
    <div className="table-wrapper">
      <table className="document-table">
        <thead>
          <tr className="document-table__row">
            <th
              className="document-table__head"
              onClick={() => handleSort("number")}
            >
              NUMBER {getSortIcon("number")}
            </th>
            <th
              className="document-table__head"
              onClick={() => handleSort("date")}
            >
              DATE {getSortIcon("date")}
            </th>
            <th
              className="document-table__head"
              onClick={() => handleSort("totalPayment")}
            >
              TOTAL PAYMENT {getSortIcon("totalPayment")}
            </th>
            <th
              className="document-table__head"
              onClick={() => handleSort("interestPayment")}
            >
              INTEREST PAYMENT {getSortIcon("interestPayment")}
            </th>
            <th
              className="document-table__head"
              onClick={() => handleSort("debtPayment")}
            >
              DEBT PAYMENT {getSortIcon("debtPayment")}
            </th>
            <th
              className="document-table__head"
              onClick={() => handleSort("remainingDebt")}
            >
              REMAINING DEBT {getSortIcon("remainingDebt")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData &&
            sortedData.map((row) => (
              <tr key={row.number} className="document-table__row">
                <td className="document-table__data">{row.number}</td>
                <td className="document-table__data">{row.date}</td>
                <td className="document-table__data">{row.totalPayment}</td>
                <td className="document-table__data">{row.interestPayment}</td>
                <td className="document-table__data">{row.debtPayment}</td>
                <td className="document-table__data">{row.remainingDebt}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
