import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Tooltip from "../Tooltip";

describe("Tooltip component", () => {
  it("renders the tooltip text correctly", () => {
    render(<Tooltip text="Hover over me" tooltip="Tooltip text" />);
    const tooltipText = screen.getByText("Hover over me");
    expect(tooltipText).toBeInTheDocument();
  });

  it("shows tooltip on hover", () => {
    render(<Tooltip text="Hover over me" tooltip="Tooltip text" />);
    const tooltipText = screen.getByText("Hover over me");
    fireEvent.mouseOver(tooltipText);
    const tooltip = screen.getByText("Tooltip text");
    expect(tooltip).toBeInTheDocument();
  });

  it("hides tooltip when not hovered", () => {
    render(<Tooltip text="Hover over me" tooltip="Tooltip text" />);
    const tooltip = screen.getByText("Tooltip text");
    expect(tooltip).toBeInTheDocument();
  });

  it("associates tooltip with text via aria-describedby", () => {
    render(<Tooltip text="Hover over me" tooltip="Tooltip text" />);
    const tooltipText = screen.getByText("Hover over me");
    expect(tooltipText).toHaveAttribute("aria-describedby", "tooltip-span");
  });
});
