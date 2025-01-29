// src/components/Label.test.tsx
import { render, screen } from "@testing-library/react";
import Label from "../Label";
import React from 'react'

describe("Label component", () => {
  it("should render label with correct text and htmlFor attribute", () => {
    const labelTitle = "First Name";
    const htmlFor = "firstName";

    render(
      <Label labelTitle={labelTitle} htmlFor={htmlFor} isRequired={false} />
    );
screen.debug();
    const labelElement = screen.getByLabelText(htmlFor);
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute("for", htmlFor);
  });

  it("should render required indicator when isRequired is true", () => {
    const labelTitle = "Last Name";
    const htmlFor = "lastName";

    render(
      <Label labelTitle={labelTitle} htmlFor={htmlFor} isRequired={true} />
    );

    const spanElement = screen.getByText("*");
    expect(spanElement).toBeInTheDocument();
    expect(spanElement).toHaveClass("red");
  });

  it("should not render required indicator when isRequired is false", () => {
    const labelTitle = "Email";
    const htmlFor = "email";

    render(
      <Label labelTitle={labelTitle} htmlFor={htmlFor} isRequired={false} />
    );

    const labelElement = screen.getByText(labelTitle);
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).not.toHaveTextContent("*");
  });

  it("should have aria-label attribute with htmlFor value", () => {
    const labelTitle = "Phone";
    const htmlFor = "phone";

    render(
      <Label labelTitle={labelTitle} htmlFor={htmlFor} isRequired={false} />
    );

    const labelElement = screen.getByLabelText(htmlFor);
    expect(labelElement).toHaveAttribute("aria-label", htmlFor);
  });
});
