import "./Accordion.css";
import React from "react";
import { FC } from "react";
import up from "/src/assets/Expand_up.svg";
import down from "/src/assets/Expand_down.svg";
import { AppDispatch } from "../../store";
import { closeOtherItems, toggleItem } from "./AccordionSlice";


export type TAccordionItemProps = {
  id: string;
  title: string;
  content: string;
  isOpen: boolean;
};

const Accordion: FC<{
  accordionId: string;
  accordionData: TAccordionItemProps;
  dispatch: AppDispatch;
}> = ({ accordionId, accordionData, dispatch }) => {
  function handleToggle(itemId: string) {
    dispatch(closeOtherItems({ itemId }));
    dispatch(toggleItem({ accordionId, itemId }));
    console.log(dispatch(toggleItem({ accordionId, itemId })));
    
  }

  return (
    <div
      key={accordionData.id}
      className="accordion-item"
      onClick={() => handleToggle(accordionData.id)}
    >
      <div className="accordion-title">
        {accordionData.title}
        <img
          src={accordionData.isOpen ? up : down}
          alt={accordionData.isOpen ? "up-arrow" : "down-arrow"}
        />
      </div>
      {accordionData.isOpen ? (
        <div className="accordion-content">{accordionData.content}</div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Accordion;
