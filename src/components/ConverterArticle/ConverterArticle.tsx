import React, { FC } from "react";
import "./ConverterArticle.css";
import { init } from "./ConverterArticle";
import { useState, useEffect } from "react";

type CurrencyResult = { [key: string]: number };
export const ConverterArticle: FC = () => {
  const [currencyResults, setCurrencyResults] = useState<CurrencyResult>({});
  const currencyList: React.JSX.Element[] = [];

  useEffect(() => {
    init(setCurrencyResults);
  }, [currencyResults]);

  for (const code in currencyResults) {
    currencyList.push(
      <li className="converter__currency" key={code} role="option">
        <p className="converter__currency-title">{code}:</p>
        <p className="converter__currency-rate">
          {currencyResults[code].toFixed(2)}
        </p>
      </li>
    );
  }

  return (
    <article
      className="converter"
      role="region"
      aria-labelledby="converter-title"
    >
      <h2 id="converter-title" className="converter__title">
        Exchange rate in internet bank
      </h2>
      <p className="converter__update-text">
        Update every 15 minutes, MSC 09.08.2022
      </p>
      <p className="converter__subtitle">Currency</p>
      <ul className="converter__currencies" role="listbox">
        {currencyList}
      </ul>
      <img
        className="converter__img"
        src="src/assets/rate-img.svg"
        alt="bank"
      />
      <p className="converter__all-courses">All courses</p>
    </article>
  );
};
