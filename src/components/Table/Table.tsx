import axios from "axios";
import "./Table.css";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Loader from "../Loader/Loader";
import ascending from "/src/assets/ascending.svg"
import descending from "/src/assets/descending.svg"

interface RowData {
  number: number;
  date: string;
  totalPayment: number;
  interestPayment: number;
  debtPayment: number;
  remainingDebt: number;
}

interface ResponseData {
  data: {
    credit: {
      paymentSchedule: RowData[];
    };
  };
}

const Table: React.FC = () => {
  const [tableData, setTableData] = useState<RowData[]>();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [sortColumn, setSortColumn] = useState<keyof RowData | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    getTableData();
  }, []);

  async function getTableData() {
    setStatus("loading");
    try {
      const id = localStorage.getItem("id");
      // if (!id) {
      //   throw "No such id";
      // }
      console.log(Number(id));

      const response: ResponseData = await axios.get(
        `http://localhost:8080/admin/application/${Number(id)}`
      );

      setTableData(response.data.credit.paymentSchedule);
      setStatus("success");
      return response.data.credit.paymentSchedule;
    } catch {
      setStatus("error");
      console.error("Failed to fetch table data");

      return "error";
    }
  }

  const sortedData = useMemo(() => {
    if (!sortColumn) return tableData;

    const newData = tableData ? [...tableData] : [];
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
  }, [tableData, sortColumn, sortDirection]);

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
      <img className="sort-indicator"
        src={
          sortColumn !== key || sortDirection === "asc"
            ? ascending
            : descending
        }
      />
    );
  };

  return status === "loading" ? (
    <Loader />
  ) : status === "success" ? (
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
  ) : (
    <div>Failed to fetch data</div>
  );
};
export default Table;
