import { Button } from "../Button/Button";
import "./ChooseDesignSection.css";
import cards from "../../assets/cards.svg";
export const ChooseDesignSection = () => {
  return (
    <section className="choose-design" aria-label="Card Design Options">
      <h1 className="choose-design__title">
        Choose the design you like and apply for card right now
      </h1>
      <div className="choose-design__button" aria-label="Choose a Card Design">
        <Button title="Choose the card" />
      </div>
      <img
        className="choose-design__img"
        src={cards}
        alt="Different card designs"
      />
    </section>
  );
};

