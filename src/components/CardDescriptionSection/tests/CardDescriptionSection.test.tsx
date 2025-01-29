/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("../../Button/Button", () => ({
  default: ({ title, isDisabled, type, padding }: any) => (
    <button data-testid="button" disabled={isDisabled} type={type}>
      {title} {padding}
    </button>
  ),
}));

vi.mock("../../Tooltip/Tooltip", () => ({
  default: ({ text }: any) => (
    <span data-testid={`tooltip-${text}`}>
      {text}
    </span>
  ),
}));

import { CardDescriptionSection } from "../CardDescriptionSection";

describe("CardDescriptionSection Component", () => {
  it("renders the main title and subtitle", () => {
    render(<CardDescriptionSection />);

    expect(
      screen.getByText("Platinum digital credit card")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Our best credit card. Suitable for everyday spending and shopping. Cash withdrawals and transfers without commission and interest."
      )
    ).toBeInTheDocument();
  });

  it("renders all features with tooltips", () => {
    render(<CardDescriptionSection />);

    expect(screen.getByText("Up to 160 days")).toBeInTheDocument();
    expect(screen.getByTestId("tooltip-No percent").textContent).toBe(
      "No percent"
    );

    expect(screen.getByText("Up to 600 000 ₽")).toBeInTheDocument();
    expect(screen.getByTestId("tooltip-Credit limit").textContent).toBe(
      "Credit limit"
    );

    expect(screen.getByText("0 ₽")).toBeInTheDocument();
    expect(screen.getByTestId("tooltip-Card service is free").textContent).toBe(
      "Card service is free"
    );
  });

  it("renders the button with correct props", () => {
    render(<CardDescriptionSection />);

    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Apply for card");
    expect(button).not.toBeDisabled();
  });

  it("renders the card image with correct attributes", () => {
    render(<CardDescriptionSection />);

    const image = screen.getByAltText("card sample");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/src/assets/card1.svg");
    expect(image).toHaveClass("description-image");
  });
});
