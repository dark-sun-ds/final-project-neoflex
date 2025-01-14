import { Button } from "../../components/Button/Button";
import "./NotFound.css";
import React from "react";
import errorImg from "/src/assets/error.svg";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="not-found">
      <div className="not-found__wrapper">
        <h1 className="not-found__title">
          Oops....
          <br />
          <br />
          Page not found
        </h1>
        <p className="not-found__description">
          This Page doesn`t exist or was removed! We suggest you go back.
        </p>
        <Button title="Go back" type="button" onClick={handleGoBack} />
      </div>
      <img className="not-found__img" src={errorImg} alt="" />
    </div>
  );
};

export default NotFound;
