import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ConverterArticle } from "../ConverterArticle.tsx";

vi.mock("../ConverterArticle", async () => {
  const actual = await vi.importActual("../ConverterArticle");
  return {
    ...actual,
    init: vi.fn(async (setCurrencyResults) => {
      await new Promise((resolve) => setTimeout(resolve, 0)); 
      setCurrencyResults({
        USD: 75.5,
        EUR: 82.3,
        GBP: 95.1,
      });
    }),
  };
});

describe("ConverterArticle Component", () => {
  it("renders the component with correct content and updated currency rates",  () => {
    render(<ConverterArticle />);

    expect(
      screen.getByRole("heading", { name: /Exchange rate in internet bank/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Update every 15 minutes, MSC 09.08.2022/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Currency/i)).toBeInTheDocument();

    expect(screen.getByRole("img", { name: /bank/i })).toBeInTheDocument();

    expect(screen.getByText(/All courses/i)).toBeInTheDocument();
  });

  it("update currency rates", async () => {
    render(<ConverterArticle />);
    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      expect(screen.getAllByRole("option")).toHaveLength(3);
      expect(screen.getByText("USD:")).toBeInTheDocument();
      expect(screen.getByText("75.50")).toBeInTheDocument();
      expect(screen.getByText("EUR:")).toBeInTheDocument();
      expect(screen.getByText("82.30")).toBeInTheDocument();
      expect(screen.getByText("GBP:")).toBeInTheDocument();
      expect(screen.getByText("95.10")).toBeInTheDocument();
    });
  });

  it("renders the correct aria attributes", async () => {
    render(<ConverterArticle />);

    await waitFor(() => {
      expect(
        screen.getByRole("region", { name: /Exchange rate in internet bank/i })
      ).toBeInTheDocument();
      expect(screen.getByRole("listbox")).toHaveAttribute("role", "listbox");
      expect(screen.getAllByRole("option")[0]).toHaveAttribute(
        "role",
        "option"
      );
    });
  });
});
