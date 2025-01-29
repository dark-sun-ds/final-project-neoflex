import Tile from "../../../Tile/Tile";
import "./TabAbout.css";
import React from 'react'

const TabAbout = () => {
  const aboutInfo = [
    {
      img: "src/assets/about1.svg",
      title: "Up to 50 000 ₽",
      subtitle: "Cash and transfers without commission and percent",
    },
    {
      img: "src/assets/about2.svg",
      title: "Up to 160 days",
      subtitle: "Without percent on the loan",
    },
    {
      img: "src/assets/about3.svg",
      title: "Free delivery",
      subtitle:
        "We will deliver your card by courier at a convenient place and time for you",
    },
    {
      img: "src/assets/about4.svg",
      title: "Up to 12 months",
      subtitle:
        "No percent. For equipment, clothes and other purchases in installments",
    },
    {
      img: "src/assets/about5.svg",
      title: "Convenient deposit and withdrawal",
      subtitle:
        "At any ATM. Top up your credit card for free with cash or transfer from other cards",
    },
  ];
  return (
    <div className="tab-container" aria-label="tab-container">
      {aboutInfo.map((info, index) => (
        <Tile 
          key={index}
          elemAmount={3}
          theme={index % 2 === 0 ? "light" : "dark"}
          info={info}
        />
      ))}
    </div>
  );
};

export default TabAbout;
