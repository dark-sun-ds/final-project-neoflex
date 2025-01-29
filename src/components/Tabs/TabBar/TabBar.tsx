import { FC } from "react";
import React from 'react'
import "./TabBar.css";
import Divider from "../../Divider/Divider";
import TabItem from "./TabItem";
import { AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../TabsSlice";
const TabBar: FC<{ activeTab: string }> = ({ activeTab }) => {
  const dispatch: AppDispatch = useDispatch();

  function handleTabClick(tab: string) {
    dispatch(setActiveTab(tab));
  }

  return (
    <>
      <nav className="tab-bar">
        <TabItem
          title="About card"
          onClick={() => handleTabClick("About card")}
          isActive={activeTab === "About card"}
        />
        <TabItem
          title="Rates and conditions"
          onClick={() => handleTabClick("Rates and conditions")}
          isActive={activeTab === "Rates and conditions"}
        />
        <TabItem
          title="Cashback"
          onClick={() => handleTabClick("Cashback")}
          isActive={activeTab === "Cashback"}
        />
        <TabItem
          title="FAQ"
          onClick={() => handleTabClick("FAQ")}
          isActive={activeTab === "FAQ"}
        />
      </nav>
      <Divider isActive={null} parent="tabBar"/>
    </>
  );
};

export default TabBar;
