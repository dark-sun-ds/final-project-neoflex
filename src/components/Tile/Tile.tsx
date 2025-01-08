import { FC } from "react";
import "./Tile.css";

type TInfo = {
  img?: string;
  title: string;
  subtitle: string;
};

const Tile: FC<{
  elemAmount: number;
  theme: "dark" | "normal" | "light";
  info: TInfo;
}> = ({ elemAmount, theme, info }) => {
  const className = `tile ${theme}`;
  if (elemAmount === 3) {
    return (
      <div className={className}>
        <img className="tile__img" src={info.img} alt="icon" />
        <h3 className="tile__title">{info.title}</h3>
        <p className="tile__subtitle">{info.subtitle}</p>
      </div>
    );
  }
  else if (elemAmount === 2) {
    return (
      <div className={className}>
        <p className="tile__subtitle">{info.title}</p>
        <p className="tile__bold-subtitle">{info.subtitle}</p>
      </div>
    );
  }
};

export default Tile;
