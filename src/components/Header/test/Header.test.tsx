import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Header } from "../Header";

describe("Header component", () => {
  it("renders the logo correctly", () => {
    render(<Header />);
    const logoElement = screen.getByText(/NeoBank/i);
    expect(logoElement).toBeInTheDocument();
  });

  it("renders the Online Bank button", () => {
    render(<Header />);
    const buttonElement = screen.getByRole("button", { name: /Online Bank/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("toggles the mobile navigation on button click", () => {
    global.innerWidth = 375;
    global.dispatchEvent(new Event("resize"));
    render(<Header />);
    const menuButton = screen.getByRole("button", {
      name: /Toggle Navigation/i,
    });

    expect(
      screen.queryByRole("navigation", {
        name: "mobile-navigation",
      })
    ).toBeNull();

    fireEvent.click(menuButton);
    expect(
      screen.getByRole("navigation", {
        name: "mobile-navigation",
      })
    ).toBeInTheDocument();

    fireEvent.click(menuButton);
    expect(
      screen.queryByRole("navigation", {
        name: "mobile-navigation",
      })
    ).toBeNull();
  });
});
