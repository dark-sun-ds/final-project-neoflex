import "./Header.css";
import { useState } from "react";
import { Button } from "../Button/Button";
import menu from "../../assets/menu.svg";
import NavBar from "../NavBar/NavBar";
export const Header = () => {
  const [mobNavOpen, setMobNavOpen] = useState(false);
  function navToggle () {
    setMobNavOpen(() =>!mobNavOpen);
  }

  return (
    <header className="header">
      <a href="#" className="header-logo">
        NeoBank
      </a>
      <NavBar flexDirection="row" />
      <div className="header__buttons-container">
        <Button title="Online Bank" type="button" padding="16px"></Button>
        <button
          className="header__humburger-btn"
          onClick={navToggle}
          aria-label="Toggle Navigation"
        >
          <img src={menu} alt="Menu" aria-hidden="true" />
        </button>
        <NavBar flexDirection="column" display={mobNavOpen} />
      </div>
    </header>
  );
};
