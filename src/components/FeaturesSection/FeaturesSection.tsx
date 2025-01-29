import React from "react";
import "./FeaturesSection.css";
import features from "../../assets/feature.svg";
export const FeaturesSection = () => {
  return (
    <section className="features" aria-label="Features Section">
      <img className="features__img" src={features} alt="Features Image" />

      <h2 className="features__title">We Provide Many Features You Can Use</h2>
      <p className="features_subtitle">
        You can explore the features that we provide with fun and have their own
        functions each feature
      </p>
      <ul className="features__list" role="list">
        <li className="features__item" role="option">
          Powerful online protection
        </li>
        <li className="features__item" role="option">
          Cashback without borders
        </li>
        <li className="features__item" role="option">
          Personal design
        </li>
        <li className="features__item" role="option">
          Work anywhere in the world
        </li>
      </ul>
    </section>
  );
};
