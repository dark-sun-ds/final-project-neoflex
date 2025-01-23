import React, { CSSProperties, MouseEventHandler, useState } from "react";
import "./Button.css";

type TProps = {
  title: string;
  type: "button" | "submit" | "reset" | undefined;
  padding: string;
  scrollTo?: string;
  color?: "red" | "blue";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isDisabled: boolean;
};
export const Button: React.FC<TProps> = ({
  title,
  type,
  padding,
  scrollTo,
  onClick,
  color,
  isDisabled,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonColor = color === "red" ? "#D93737CC" : "#003cff";
  const buttonHoverColor = color === "red" ? "#e87b7bd5" : "#7796c0";
  const buttonStyle = {
    width: "max-content",
    height: "50px",
    borderRadius: "16px",
    padding: padding,
    backgroundColor: isHovered ? buttonHoverColor : buttonColor,
    color: "white",
    border: "none",
    outline: "none",
    transition: "background-color 0.4s ease-in-out",
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: "17.92px",
    textAlign: "center" as CSSProperties["textAlign"],
    opacity: isDisabled ? 0.5 : 1,
    cursor: isDisabled ? "not-allowed" : "pointer",
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
      {...(isDisabled ? {disabled:true} : {})}
    >
      {title}
    </button>
  );
};
