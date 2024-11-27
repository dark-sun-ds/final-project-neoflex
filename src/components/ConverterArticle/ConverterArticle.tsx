import "./ConverterArticle.css";
import bank from "../../assets/rate-img.svg";
export const ConverterArticle = () => {
  const currencyResults = [
    {
      title: "USD",
      rate: 199,
    },
    {
      title: "EUR",
      rate: 19,
    },
    {
      title: "CNY",
      rate: 93,
    },
    {
      title: "UAH",
      rate: 23,
    },
    {
      title: "JPY",
      rate: 0.54,
    },
    {
      title: "PLN",
      rate: 3.5,
    },
  ];

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
        {currencyResults.map((item, index) => (
          <li
            className="converter__currency"
            key={item.title}
            role="option"
            aria-labelledby={"currency-title-" + index}
          >
            <p
              className="converter__currency-title"
              id={"currency-title-" + index}
            >
              {item.title}:
            </p>
            <p className="converter__currency-rate">{item.rate.toFixed(2)}</p>
          </li>
        ))}
      </ul>
      <img className="converter__img" src={bank} alt="bank" />
      <p className="converter__all-courses">All courses</p>
    </article>
  );
};

