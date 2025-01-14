import Divider from "../Divider/Divider";
import "./GetCardSection.css";
import React from "react";

const GetCardSection = () => {
  const stepsData = [
    {
      description:
        "Fill out an online application - you do not need to visit the bank",
    },
    {
      description:
        "Find out the bank's decision immediately after filling out the application",
    },
    {
      description:
        "The bank will deliver the card free of charge, wherever convenient, to your city",
    },
  ];

  return (
    <div className="get-card">
      <h2 className="get-card__title">How to get a card</h2>
      <div className="get-card__step-container">
        {stepsData.map((step, index) => (
          <div key={index} className="get-card__step">
            <div className="get-card__step-visual">
              <div className="get-card__step-circle">{++index}</div>
              <Divider isActive={null} parent="getCard" />
            </div>
            <p className="get-card__description">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetCardSection;
