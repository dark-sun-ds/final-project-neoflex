import "./Accordions.css";
import React from "react";
import { FC, useEffect } from "react";
import Accordion from "./Accordion.tsx";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "./AccordionSlice";

type TAccordion = {
  accordionId: string;
  data: {
    id: string;
    title: string;
    content: string;
    isOpen: boolean;
  }[];
};

const Accordions: FC<TAccordion> = ({ accordionId, data }) => {
  const dispatch: AppDispatch = useDispatch();
  const accordionItems = useSelector(
    (state: RootState) => state.accordion[accordionId]?.items
  );

  useEffect(() => {
    dispatch(setItems({ accordionId, items: data }));
  }, [data, dispatch]);

  return (
    <div className="accordion">
      {accordionItems &&
        accordionItems.length > 0 &&
        accordionItems.map((item) => (
          <Accordion
            key={item.id}
            accordionId={accordionId}
            accordionData={item}
            dispatch={dispatch}
          />
        ))}
    </div>
  );
};

export default Accordions;
