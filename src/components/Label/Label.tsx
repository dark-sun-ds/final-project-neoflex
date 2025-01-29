import React from "react";
import "./Label.css";
import { FC } from "react";

export type TLabelProps = {
  labelTitle: string;
  htmlFor: string;
  isRequired: boolean;
};

const Label: FC<TLabelProps> = ({ labelTitle, htmlFor, isRequired }) => {
  return (
    <label className="label" htmlFor={htmlFor} aria-label={htmlFor}>
      {labelTitle}
      {isRequired && <span className="red"> *</span>}
      <br />
    </label>
  );
};

export default Label;
