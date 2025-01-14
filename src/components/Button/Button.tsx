import React, { CSSProperties, MouseEventHandler, useState } from "react";
import "./Button.css";

type TProps = {
  title: string;
  type: "button" | "submit" | "reset" | undefined;
  padding: string;
  scrollTo?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
export const Button: React.FC<TProps> = ({
  title,
  type,
  padding,
  scrollTo,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonStyle = {
    width: "max-content",
    height: "50px",
    borderRadius: "16px",
    padding: padding,
    backgroundColor: isHovered ? "#7796c0" : "#003cff",
    color: "white",
    border: "none",
    outline: "none",
    transition: "background-color 0.4s ease-in-out",
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: "17.92px",
    textAlign: "center" as CSSProperties["textAlign"],
    cursor: "pointer",
  };

  function scroll() {
    const element = scrollTo ? document.getElementById(scrollTo) : undefined;
    console.log(element);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <button
      style={buttonStyle}
      type={type}
      onClick={scrollTo ? scroll : onClick ? onClick : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {title}
    </button>
  );
};
