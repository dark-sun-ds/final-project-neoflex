import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "../Button";

describe("Button Component", () => {
  it("renders the button with the correct title", () => {
    render(
      <Button
        title="Click me"
        type="button"
        padding="10px 20px"
        isDisabled={false}
      />
    );

    const button = screen.getByText("Click me");
    expect(button).toBeInTheDocument();
  });

  it("applies the correct styles and attributes when enabled", () => {
    render(
      <Button
        title="Enabled Button"
        type="button"
        padding="10px 20px"
        color="blue"
        isDisabled={false}
      />
    );

    const button = screen.getByText("Enabled Button");
    expect(button).toHaveStyle({
      backgroundColor: "#003cff",
      opacity: "1",
      cursor: "pointer",
    });
    expect(button).not.toBeDisabled();
  });

  it("applies the correct styles and attributes when disabled", () => {
    render(
      <Button
        title="Disabled Button"
        type="button"
        padding="10px 20px"
        color="red"
        isDisabled={true}
      />
    );

    const button = screen.getByText("Disabled Button");
    expect(button).toHaveStyle({
      backgroundColor: "#D93737CC",
      opacity: "0.5",
      cursor: "not-allowed",
    });
    expect(button).toBeDisabled();
  });

  it("handles the onClick event correctly", () => {
    const handleClick = vi.fn();
    render(
      <Button
        title="Clickable Button"
        type="button"
        padding="10px 20px"
        onClick={handleClick}
        isDisabled={false}
      />
    );

    const button = screen.getByText("Clickable Button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("changes background color on hover", () => {
    render(
      <Button
        title="Hover Button"
        type="button"
        padding="10px 20px"
        color="red"
        isDisabled={false}
      />
    );

    const button = screen.getByText("Hover Button");

    fireEvent.mouseEnter(button);
    expect(button).toHaveStyle({ backgroundColor: "#e87b7bd5" });

    fireEvent.mouseLeave(button);
    expect(button).toHaveStyle({ backgroundColor: "#D93737CC" });
  });
});
