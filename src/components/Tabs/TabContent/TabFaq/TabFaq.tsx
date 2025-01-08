import "./TabFaq.css";
import { receivingCard, usingCard } from "../../../Accordion/AccordionData";
import Accordion from "../../../Accordion/Accordion";
import { v4 as uuidv4 } from "uuid";

const TabFaq = () => {
  function generateUniqueId(data: { title: string; content: string }[]) {
    return data.map((item) => ({
      ...item,
      id: uuidv4(),
      isOpen: false,
    }));
  }
  return (
    <div className="tab-faq">
      <h2 className="tab-faq__title">Issuing and receiving a card</h2>
      <Accordion accordionId="1" data={generateUniqueId(receivingCard)} />

      <h2 className="tab-faq__title">Using a credit card</h2>

      <Accordion accordionId="2" data={generateUniqueId(usingCard)} />
    </div>
  );
};

export default TabFaq;
