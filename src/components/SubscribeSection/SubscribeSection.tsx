import "./SubscribeSection.css";
import email from "../../assets/email.svg";
import { Button } from "../Button/Button";
export const SubscribeSection = () => {
  return (
    <section className="subscribe" aria-label="Newsletter Subscription">
      <p className="subscribe__support">Support</p>
      <h2 className="subscribe__title">Subscribe Newsletter & get</h2>
      <p className="subscribe__subtitle">Bank News</p>
      <form className="subscribe__form" aria-label="Subscribe to Newsletter">
        <label className="subscribe__label" htmlFor="email">
          <img
            src={email}
            alt="email icon"
            className="subscribe__input-img"
            aria-hidden="true"
          />
          <input
            className="subscribe__input"
            type="email"
            id="email"
            placeholder="Your email"
            required
          />
        </label>
        <Button title="Subscribe" />
      </form>
    </section>
  );
};

