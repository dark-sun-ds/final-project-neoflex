import React from "react";
import "./Divider.css";

type TParent = "tabItem" | "tabBar" | "getCard" | "formParent";

const Divider: React.FC<{ isActive: boolean | null; parent: TParent }> = ({
  isActive,
  parent,
}) => {
  return (
    <>
      {isActive === null ? <div className={"common " + parent}></div> : <></>}
      {isActive ? <div className={"active " + parent}></div> : <></>}
    </>
  );
};

export default Divider;
