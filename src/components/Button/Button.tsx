import React from "react";
import "./Button.css";

type TProps = {
  title: string;
  type: "button" | "submit" | "reset" | undefined;
  scrollTo?: string;
};
export const Button: React.FC<TProps> = ({ title, type, scrollTo }) => {
  function scroll() {
    const element = scrollTo ? document.getElementById(scrollTo) : undefined;
    console.log(element);
    
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <button className="button" type={type} onClick={scrollTo ? scroll : undefined}>
      {title}
    </button>
  );
};


