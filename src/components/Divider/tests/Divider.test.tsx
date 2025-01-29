import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import Divider from "../Divider";

describe("Divider Component", () => {
  it("renders common divider when isActive is null", () => {
    render(<Divider isActive={null} parent="tabItem" />);
    const divider = screen.getAllByRole("generic", { hidden: true })[1];
    console.log(divider);
    screen.debug();
    
    expect(divider).toHaveClass("common tabItem");
    expect(divider).toBeInTheDocument();
  });

  it("renders active divider when isActive is true", () => {
    render(<Divider isActive={true} parent="tabBar" />);
    const divider = screen.getAllByRole("generic", { hidden: true })[1];
    screen.debug();
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass("active tabBar");
  });

  it("renders nothing when isActive is false", () => {
    screen.debug();

    render(<Divider isActive={false} parent="getCard" />);
    const divider = screen.queryAllByRole("generic", { hidden: true })[1];
    console.log(divider);
    
    expect(divider).toBeUndefined();
  });
});
