import { FC } from "react";
import "./NavBar.css";

type TProps = {
  flexDirection: string;
  display?: boolean; // Optional prop to hide the nav bar if needed
};
const NavBar: FC<TProps> = ({ flexDirection, display=true }) => {
  let style = flexDirection === "row" ? "nav-row" : "nav-column";
  if (!display)
  {
    style += " disable";
  }
  return (
    <nav className={style} role="navigation">
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
