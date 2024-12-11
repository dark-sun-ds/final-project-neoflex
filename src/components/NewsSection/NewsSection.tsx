import React from "react";
import "./NewsSection.css";
import { Slider } from "../Slider/Slider.tsx";

export const NewsSection = () => {
  return (
    <section className="news">
      <h2 className="news__title">Current news from the world of finance</h2>
      <p className="news__subtitle">
        We update the news feed every 15 minutes. You can learn more by clicking
        on the news you are interested in.
      </p>
      <Slider />
    </section>
  );
};

