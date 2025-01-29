import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ChooseDesignSection } from "../ChooseDesignSection";

vi.mock("../../Button/Button", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Button: ({ title, ...rest }: any) => (
    <button data-testid="mock-button" {...rest}>
      {title}
    </button>
  ),
}));

vi.mock("../../../assets/cards.svg", () => ({default: "mocked-cards-src"}));

describe("ChooseDesignSection Component", () => {
  it("renders the component with correct content", () => {
    render(<ChooseDesignSection />);

    expect(
      screen.getByText(
        "Choose the design you like and apply for card right now"
      )
    ).toBeInTheDocument();
  });

  it("has image", () => {
    render(<ChooseDesignSection />);

    const image = screen.getByRole("img", {name: "Different card designs"});
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "mocked-cards-src");
  })

  it("has correct button", () => {
    render(<ChooseDesignSection />);

    const button = screen.getByTestId("mock-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Choose the card");
    expect(button).toHaveAttribute("type", "button");
    expect(button).not.toBeDisabled();
  });

  it("has correct aria labels", () => {
    render(<ChooseDesignSection />);
    expect(
      screen.getByRole("region", { name: "Card Design Options" })
    ).toBeInTheDocument();
  });
});
