import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FeaturesSection } from "../FeaturesSection";

vi.mock("../../../assets/feature.svg", () => ({default: "mocked-features-src"}));

describe("FeaturesSection Component", () => {
  it("renders the component with correct content", () => {
    render(<FeaturesSection />);

    const image = screen.getByRole("img", { name: /Features Image/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "mocked-features-src");

    expect(
      screen.getByRole("heading", {
        name: /We Provide Many Features You Can Use/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /You can explore the features that we provide with fun and have their own functions each feature/i
      )
    ).toBeInTheDocument();
  });

  it("renders list items", () => {
    render(<FeaturesSection />);

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    const listItems = screen.getAllByRole("option");
    expect(listItems).toHaveLength(4);
    expect(listItems[0]).toHaveTextContent("Powerful online protection");
    expect(listItems[1]).toHaveTextContent("Cashback without borders");
    expect(listItems[2]).toHaveTextContent("Personal design");
    expect(listItems[3]).toHaveTextContent("Work anywhere in the world");
  })

  it("renders with correct aria attributes", () => {
    render(<FeaturesSection />);
    expect(
      screen.getByRole("region", { name: "Features Section" })
    ).toBeInTheDocument();
    expect(screen.getByRole("list")).toHaveAttribute("role", "list");
    expect(screen.getAllByRole("option")[0]).toHaveAttribute("role", "option");
  });
});
