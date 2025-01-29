import { FC } from "react";
import "./NavBar.css";
import React from "react";

type TProps = {
  flexDirection: string;
};
const NavBar: FC<TProps> = ({ flexDirection }) => {
  const style = flexDirection === "row" ? "nav-row" : "nav-column";
  return (
    <nav
      className={style}
      role="navigation"
      aria-label={
        style === "nav-row" ? "desktop-navigation" : "mobile-navigation"
      }
    >
      <a href="#" className="nav_item" role="menuitem">
        Credit card
      </a>
      <a href="#" className="nav_item" role="menuitem">
        Product
      </a>
      <a href="#" className="nav_item" role="menuitem">
        Account
      </a>
      <a href="#" className="nav_item" role="menuitem">
        Resources
      </a>
    </nav>
  );
};

export default NavBar;
