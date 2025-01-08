import React from "react";
import "./TabItem.css";
import Divider from "../../Divider/Divider";

const TabItem: React.FC<{
  title: string;
  onClick: () => void;
  isActive: boolean;
}> = ({ title, onClick, isActive }) => {
  return (
    <div className="tab-item" onClick={onClick}>
      <p className="tab-title">{title}</p>
      <Divider isActive={isActive} parent="tabItem" />
    </div>
  );
};

export default TabItem;
