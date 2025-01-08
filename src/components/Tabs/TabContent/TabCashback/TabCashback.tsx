import Tile from "../../../Tile/Tile";
import "./TabCashback.css";

const TabCashback = () => {
  const cashbackInfo = [
    {
      title: "For food delivery, cafes and restaurants",
      subtitle: "5%",
    },
    {
      title: "In supermarkets with our subscription",
      subtitle: "5%",
    },
    {
      title: "In clothing stores and children's goods",
      subtitle: "2%",
    },
    {
      title: "Other purchases and payment of services andfines",
      subtitle: "1%",
    },
    {
      title: "Shopping in online stores",
      subtitle: "up to 3%",
    },
    {
      title: "Purchases from our partners",
      subtitle: "30%",
    },
  ];

  return (
    <div className="cashbacks">
      {cashbackInfo.map((info, index) => (
        <Tile
          key={index}
          elemAmount={2}
          theme={index % 2 === 0 ? "light" : "normal"}
          info={info}
        />
      ))}
    </div>
  );
};

export default TabCashback;
