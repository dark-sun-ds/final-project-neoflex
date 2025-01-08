import "./TabConditions.css";
const TabConditions = () => {
  const conditions = [
    {
      title: "Card currency",
      description: "Rubles, dollars, euro",
    },
    {
      title: "Interest free period",
      description: "0% up to 160 days",
    },
    {
      title: "Payment system",
      description: "Mastercard, Visa",
    },
    {
      title: "Maximum credit limit on the card",
      description: "600 000 ₽",
    },
    {
      title: "Replenishment and withdrawal",
      description:
        "At any ATM. Top up your credit card for free with cash or transfer from other cards",
    },
    {
      title: "Max cashback per month",
      description: "15 000 ₽",
    },
    {
      title: "Transaction Alert",
      description:
        "60 ₽ — SMS or push notifications 0 ₽ — card statement, information about transactions in the online bank",
    },
  ];
  return (
    <table className="table">
      <tbody>
        {conditions.map((condition, index) => (
          <tr className="table__row" key={index}>
            <td className="table__title">{condition.title}</td>
            <td className="table__description">{condition.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabConditions;
