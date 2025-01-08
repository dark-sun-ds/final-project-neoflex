import "./CardDescriptionSection.css";
import { Button } from "../Button/Button";
export const CardDescriptionSection = () => {
  return (
    <section className="description">
      <h1 className="description-title">Platinum digital credit card</h1>
      <p className="description-subtitle">
        Our best credit card. Suitable for everyday spending and shopping. Cash
        withdrawals and transfers without commission and interest.
      </p>
      <div className="description-features">
        <p id="percent" className="features-title">
          Up to 160 days
        </p>
        <p id="percent-subtitle" className="features-subtitle">
          No percent
        </p>
        <p id="limit" className="features-title">
          Up to 600 000 ₽
        </p>
        <p id="limit-subtitle" className="features-subtitle">
          Credit limit
        </p>
        <p id="service" className="features-title">
          0 ₽
        </p>
        <p id="service-subtitle" className="features-subtitle">
          Card service is free
        </p>
      </div>
      <div className="description-button">
        <Button title="Apply for card" type="button" />
      </div>
      <img
        src="/src/assets/card1.svg"
        alt="card sample"
        className="description-image"
      />
    </section>
  );
};

