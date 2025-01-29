import { render, screen } from "@testing-library/react";
import NavBar from "../NavBar";
import React from 'react'


describe("NavBar Component", () => {
  it("renders correctly with row direction", () => {
    render(<NavBar flexDirection="row" />);

    const nav = screen.getByRole("navigation", { name: "desktop-navigation" });
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveClass("nav-row");

    const links = screen.getAllByRole("menuitem");
    expect(links.length).toBe(4); 

    const expectedLinkText = ["Credit card", "Product", "Account", "Resources"];
    links.forEach((link, index) => {
      expect(link).toHaveTextContent(expectedLinkText[index]);
      expect(link).toHaveAttribute("href", "#");
    });
  });

  it("renders correctly with column direction", () => {
    render(<NavBar flexDirection="column" />);

    const nav = screen.getByRole("navigation", { name: "mobile-navigation" });
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveClass("nav-column");

    const links = screen.getAllByRole("menuitem");
    expect(links.length).toBe(4);

    const expectedLinkText = ["Credit card", "Product", "Account", "Resources"];
    links.forEach((link, index) => {
      expect(link).toHaveTextContent(expectedLinkText[index]);
      expect(link).toHaveAttribute("href", "#");
    });
  });

  it("links have correct href attribute", () => {
    render(<NavBar flexDirection="row" />);

    const links = screen.getAllByRole("menuitem");
    links.forEach((link) => {
      expect(link).toHaveAttribute("href", "#");
    });
  });
});
