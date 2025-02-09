import { UseFormRegister } from "react-hook-form";
import "./Select.css";
import { FC } from "react";
import { FormData } from "../Form/formUtils";
import { TScoring } from "../Scoring/Scoring";
import React from 'react'


export type TSelect = {
  id: keyof FormData;
  options: { label: string; value: string }[];
  isRequired: boolean;
};

export type TSelectScoring = {
  id: keyof TScoring | `employment.${keyof TScoring['employment']}`;
  options: { label: string; value: string }[];
  isRequired: boolean;
};

const Select: FC<{
  data: TSelect;
  register: UseFormRegister<FormData>;
}> = ({ data, register }) => {
  return (
    <select className="term-select" id={data.id} {...register(data.id)}>
      {data.options.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export const SelectScoring: FC<{
  data: TSelectScoring;
  register: UseFormRegister<TScoring>;
}> = ({ data, register }) => {
  return (
    <select className="term-select" id={data.id} {...register(data.id)}>
      {data.options.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
