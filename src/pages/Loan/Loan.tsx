import "./Loan.css";
import React from 'react'

import { CardDescriptionSection } from "../../components/CardDescriptionSection/CardDescriptionSection.tsx";
import Tabs from "../../components/Tabs/Tabs.tsx";
import GetCardSection from "../../components/GetCardSection/GetCardSection.tsx";
import Form from "../../components/Form/Prescoring.tsx";

export const Loan = () => {

  return  (
    <div className="loan">
      <CardDescriptionSection />
      <Tabs />
      <GetCardSection />
      <Form />
    </div>
  )
};
