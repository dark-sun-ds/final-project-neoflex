import "./Accordion.css";

import { FC, useEffect } from "react";
import AccordionItem from "./AccordionItem";
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

const Accordion: FC<TAccordion> = ({ accordionId, data }) => {
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
        accordionItems.length>0 && accordionItems.map((item) => (
          <AccordionItem
            key={item.id}
            accordionId={accordionId}
            accordionData={item}
            dispatch={dispatch}
          />
        ))}
    </div>
  );
};

export default Accordion;
