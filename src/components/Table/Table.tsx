import axios from "axios";
import "./Table.css";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

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

interface SortConfig {
  key: keyof RowData;
  direction: "ascending" | "descending";
}

const Table: React.FC = () => {
  const [tableData, setTableData] = useState<RowData[]>();
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

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
      console.log(response);

      setTableData(response.data.credit.paymentSchedule);
      setStatus("success");
      return response.data.credit.paymentSchedule;
    } catch {
      setStatus("error");
      console.error("Failed to fetch table data");

      return "error";
    }
  }

  const requestSort = (key: keyof RowData) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedData = [...tableData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setTableData(sortedData);
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof RowData) => {
    if (sortConfig?.key !== key) return null;
    return sortConfig.direction === "ascending" ? "🔼" : "🔽";
  };

  return status === "loading" ? (
    <Loader />
  ) : status === "success" ? (
    <table className="document-table">
      <thead className="document-table-head">
        <tr>
          <th onClick={() => requestSort("number")}>
            Number {getSortIcon("number")}
          </th>
          <th onClick={() => requestSort("date")}>
            Date {getSortIcon("date")}
          </th>
          <th onClick={() => requestSort("totalPayment")}>
            Total payment {getSortIcon("totalPayment")}
          </th>
          <th onClick={() => requestSort("interestPayment")}>
            Interest Payment {getSortIcon("interestPayment")}
          </th>
          <th onClick={() => requestSort("debtPayment")}>
            Debt Payment {getSortIcon("debtPayment")}
          </th>
          <th onClick={() => requestSort("remainingDebt")}>
            Remaining Debt {getSortIcon("remainingDebt")}
          </th>
        </tr>
      </thead>
      <tbody className="document-table-body">
        {tableData &&
          tableData.map((row) => (
            <tr key={row.number} className="document-table-row">
              <td>{row.number}</td>
              <td>{row.date}</td>
              <td>{row.totalPayment}</td>
              <td>{row.interestPayment}</td>
              <td>{row.debtPayment}</td>
              <td>{row.remainingDebt}</td>
            </tr>
          ))}
      </tbody>
    </table>
  ) : (
    <div>Failed to fetch data</div>
  );
};
export default Table;
