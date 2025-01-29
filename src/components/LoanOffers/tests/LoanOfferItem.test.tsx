import { render, screen } from "@testing-library/react";
import LoanOfferItem from "../LoanOfferItem";
import { TOfferProps } from "../LoanOffers";
import { AppDispatch } from "../../../store";
import { vi } from "vitest";
import React from "react";

const mockDispatch = vi.fn(async () => {
  return Promise.resolve();
}) as AppDispatch;

const sampleOffer: TOfferProps = {
  applicationId: 1,
  requestedAmount: 100000,
  totalAmount: 120000,
  term: 12,
  monthlyPayment: 10000,
  rate: 10,
  isInsuranceEnabled: true,
  isSalaryClient: false,
};

describe("LoanOfferItem Component", () => {
  it("renders correctly", () => {
    render(<LoanOfferItem offer={sampleOffer} dispatch={mockDispatch} />);

    expect(
      screen.getByText("Requested amount:")
    ).toBeInTheDocument();
    expect(screen.getByText("100000 ₽")).toBeInTheDocument();
    expect(screen.getByText("Total amount:")).toBeInTheDocument();
    expect(screen.getByText("120000 ₽")).toBeInTheDocument();
    expect(screen.getByText("For 12 months")).toBeInTheDocument();
    expect(screen.getByText("Monthly payment:")).toBeInTheDocument();
    expect(screen.getByText("10000 ₽")).toBeInTheDocument();
    expect(screen.getByText("Your rate: 10%")).toBeInTheDocument();
    expect(screen.getByText("Insurance included")).toBeInTheDocument();
    expect(screen.getByText("Salary client")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Select/i })).toBeInTheDocument();
  });

  it("displays valid/invalid icons", () => {
    render(<LoanOfferItem offer={sampleOffer} dispatch={mockDispatch} />);
    expect(screen.getByAltText("valid")).toBeInTheDocument();
    expect(screen.getByAltText("invalid")).toBeInTheDocument();
  });

  it("displays invalid/valid icons", () => {
    const modifiedOffer: TOfferProps = {
      ...sampleOffer,
      isInsuranceEnabled: false,
      isSalaryClient: true,
    };

    render(<LoanOfferItem offer={modifiedOffer} dispatch={mockDispatch} />);

    expect(screen.getByAltText("invalid")).toBeInTheDocument(); 
    expect(screen.getByAltText("valid")).toBeInTheDocument(); 
  });
});
