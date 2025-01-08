import React from "react";
import "./Button.css";

type TProps = {
  title: string;
  type: "button" | "submit" | "reset" | undefined;
};
export const Button: React.FC<TProps> = ({ title, type }) => {
  return <button className="button" type={type} >{title}</button>;
};


