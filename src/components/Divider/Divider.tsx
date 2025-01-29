import React from "react";
import "./Divider.css";

type TParent = "tabItem" | "tabBar" | "getCard" | "formParent";

const Divider: React.FC<{ isActive: boolean | null; parent: TParent }> = ({
  isActive,
  parent,
}) => {
  return (
    <>
      {isActive === null ? <div className={"common " + parent} aria-hidden="true"></div> : <></>}
      {isActive && <div className={"active " + parent} aria-hidden="true"></div>}
    </>
  );
};

export default Divider;
