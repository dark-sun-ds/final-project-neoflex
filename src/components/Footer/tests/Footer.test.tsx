import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Footer } from "../Footer";

vi.mock("../../../assets/logo.svg", () => ({default: "mocked-logo-src"}));

describe("Footer Component", () => {
  it("renders the footer with correct structure and content", () => {
    render(<Footer />);

    expect(
      screen.getByRole("contentinfo")
    ).toBeInTheDocument();

    const logoImage = screen.getByRole("img", { hidden: true });
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute("src", "mocked-logo-src");
    expect(logoImage).toHaveAttribute("aria-hidden", "true");

    expect(screen.getByText(/\+7 \(495\) 984 25 13/i)).toBeInTheDocument();
    expect(screen.getByText(/info@neoflex.ru/i)).toBeInTheDocument();

    expect(screen.getByText(/We use cookies/i)).toBeInTheDocument();
  });

  it("renders learn more", () => {
    render(<Footer />);

    const learnMoreList = screen.getByRole("navigation", {
      name: /Learn More/i,
    });
    expect(learnMoreList).toBeInTheDocument();

    const learnMoreItems = screen.getAllByRole("listitem");
    expect(learnMoreItems).toHaveLength(10);
    expect(learnMoreItems[0].textContent).toContain("About bank");
    expect(learnMoreItems[5].textContent).toContain("Bank career");
  })

  it("renders links with proper href attributes", () => {
    render(<Footer />);

    const learnMoreLinks = screen.getAllByRole("link");
    learnMoreLinks.forEach((link) => {
      expect(link).toHaveAttribute("href");
    });
  });
});
