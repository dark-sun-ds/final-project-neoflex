import React from "react";
import TabBar from "./TabBar/TabBar";
import TabAbout from "./TabContent/TabAbout/TabAbout";
import TabConditions from "./TabContent/TabConditions/TabConditions";
import TabCashback from "./TabContent/TabCashback/TabCashback";
import TabFaq from "./TabContent/TabFaq/TabFaq";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

const Tabs = () => {
  const activeTab = useSelector((state: RootState) => state.tab.activeTab);
  return (
    <>
      <TabBar activeTab={activeTab} />
      {(() => {
        switch (activeTab) {
          case "About card":
            return <TabAbout />;
          case "Rates and conditions":
            return <TabConditions />;
          case "Cashback":
            return <TabCashback />;
          case "FAQ":
            return <TabFaq />;
          default:
            return <TabAbout />;
        }
      })()}
    </>
  );
};


export default Tabs;
