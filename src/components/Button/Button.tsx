import React from "react";
import "./Button.css";

type TProps = {
    title: string;
}
export const Button: React.FC<TProps> = ({ title }) => {
  return <button className="button">{title}</button>;
};


