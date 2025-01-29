import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input, { TInput } from "../Input";
import { describe, it, expect, vi } from "vitest";
import React from 'react'

const mockRegister = vi.fn();
const mockErrors = {};

const mockData: TInput = {
  id: "firstName",
  type: "text",
  placeholder: "Enter your first name",
  isRequired: true,
  rules: {},
};

describe("Input component", () => {
  it("should render input field with correct attributes", () => {
    render(
      <Input
        data={mockData}
        register={mockRegister}
        errors={mockErrors}
        isSubmitted={false}
      />
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id", mockData.id);
    expect(input).toHaveAttribute("type", mockData.type);
    expect(input).toHaveAttribute("placeholder", mockData.placeholder);
    expect(input).toBeRequired();
  });

  it("should call register function on input change", () => {
    render(
      <Input
        data={mockData}
        register={mockRegister}
        errors={mockErrors}
        isSubmitted={false}
      />
    );

    const input = screen.getByRole("textbox");
    userEvent.type(input, "John");

    expect(mockRegister).toHaveBeenCalled();
  });

  it("should show validation error when there's an error and form is submitted", () => {
    const mockErrors = {
      firstName: { type: "required", message: "First name is required" },
    };

    render(
      <Input
        data={mockData}
        register={mockRegister}
        errors={mockErrors}
        isSubmitted={true}
      />
    );

    const error = screen.getByText("First name is required");
    expect(error).toBeInTheDocument();
  });

  it("should show validation image when there's an error and form is submitted", () => {
    const mockErrors = {
      firstName: { type: "required", message: "First name is required" },
    };

    render(
      <Input
        data={mockData}
        register={mockRegister}
        errors={mockErrors}
        isSubmitted={true}
      />
    );

    const errorImg = screen.getByRole("img", { name: /invalid/i });
    expect(errorImg).toBeInTheDocument();
  });

});
