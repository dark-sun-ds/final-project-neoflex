import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useForm, UseFormRegister } from "react-hook-form";
import Select, { SelectScoring, TSelect, TSelectScoring } from "../Select";
import { FormData } from "../../Form/formUtils";
import { TScoring } from "../../Scoring/Scoring";

const formDataMock: TSelect = {
  id: "term",
  options: [
    { label: "6 month", value: "6" },
    { label: "12 month", value: "12" },
  ],
  isRequired: true,
};

const scoringDataMock: TSelectScoring = {
  id: "employment.employmentStatus",
  options: [
    { label: "Unemployed", value: "UNEMPLOYED" },
    { label: "Self employed", value: "SELF_EMPLOYED" },
    { label: "Employed", value: "EMPLOYED" },
    { label: "Business owner", value: "BUSINESS_OWNER" },
  ],
  isRequired: true,
};

const MockForm: React.FC<{
  children: (register: UseFormRegister<FormData>) => React.ReactNode;
}> = ({ children }) => {
  const { register } = useForm<FormData>();
  return <form>{children(register)}</form>;
};

const MockFormScoring: React.FC<{
  children: (register: UseFormRegister<TScoring>) => React.ReactNode;
}> = ({ children }) => {
  const { register } = useForm<TScoring>();
  return <form>{children(register)}</form>;
};

describe("Select component", () => {
  it("render select", () => {
    render(
      <MockForm>
        {(register) => <Select data={formDataMock} register={register} />}
      </MockForm>
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
  });

  it("renders the select options correctly for FormData", () => {
    render(
      <MockForm>
        {(register) => <Select data={formDataMock} register={register} />}
      </MockForm>
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveTextContent("6 month");
    expect(options[1]).toHaveTextContent("12 month");
  });

  it("renders the select options correctly for TScoring", () => {
    render(
      <MockFormScoring>
        {(register) => (
          <SelectScoring data={scoringDataMock} register={register} />
        )}
      </MockFormScoring>
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(4);
    expect(options[0]).toHaveTextContent("Unemployed");
    expect(options[1]).toHaveTextContent("Self employed");
    expect(options[2]).toHaveTextContent("Employed");
    expect(options[3]).toHaveTextContent("Business owner");
  });
});
