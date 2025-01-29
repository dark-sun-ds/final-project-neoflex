import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Table from "../Table"; 
import { RowData } from "../../../pages/LoanDocument/LoanDocument"; 
import React from "react";

const mockData: RowData[] = [
  {
    number: 1,
    date: "2023-10-26",
    totalPayment: 100,
    interestPayment: 10,
    debtPayment: 90,
    remainingDebt: 900,
  },
  {
    number: 2,
    date: "2023-10-27",
    totalPayment: 200,
    interestPayment: 20,
    debtPayment: 180,
    remainingDebt: 720,
  },
  {
    number: 3,
    date: "2023-10-25",
    totalPayment: 150,
    interestPayment: 15,
    debtPayment: 135,
    remainingDebt: 585,
  },
];

describe("Table Component", () => {
  it("renders the table with correct headers", () => {
    render(<Table data={mockData} />);
    expect(screen.getByText("NUMBER")).toBeInTheDocument();
    expect(screen.getByText("DATE")).toBeInTheDocument();
    expect(screen.getByText("TOTAL PAYMENT")).toBeInTheDocument();
    expect(screen.getByText("INTEREST PAYMENT")).toBeInTheDocument();
    expect(screen.getByText("DEBT PAYMENT")).toBeInTheDocument();
    expect(screen.getByText("REMAINING DEBT")).toBeInTheDocument();
  });

  it("renders the table rows with correct data", () => {
    render(<Table data={mockData} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2023-10-26")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("sorts by number in ascending order by default", () => {
    render(<Table data={mockData} />);
    fireEvent.click(screen.getByText("NUMBER")); 

    const rows = screen.getAllByRole("row"); 
    expect(rows[1].textContent).toContain("1");
    expect(rows[2].textContent).toContain("2");
    expect(rows[3].textContent).toContain("3");
  });

  it("sorts by number in descending order", () => {
    render(<Table data={mockData} />);
    fireEvent.click(screen.getByText("NUMBER")); 
    fireEvent.click(screen.getByText("NUMBER")); 

    const rows = screen.getAllByRole("row");
    expect(rows[1].textContent).toContain("3");
    expect(rows[2].textContent).toContain("2");
    expect(rows[3].textContent).toContain("1");
  });

  it("sorts by date", () => {
    render(<Table data={mockData} />);
    fireEvent.click(screen.getByText("DATE"));

    const rows = screen.getAllByRole("row");
    expect(rows[1].textContent).toContain("2023-10-25");
    expect(rows[2].textContent).toContain("2023-10-26");
    expect(rows[3].textContent).toContain("2023-10-27");
  });

  it("displays correct sort icons", () => {
    render(<Table data={mockData} />);

    fireEvent.click(screen.getByText("NUMBER"));
    let sortIcon = screen.getAllByRole("img")[0];
    expect(sortIcon).toHaveAttribute("alt", "ascending");
    fireEvent.click(screen.getByText("NUMBER"));
    sortIcon = screen.getAllByRole("img")[0];
    expect(sortIcon).toHaveAttribute("alt", "descending");
  });
});
