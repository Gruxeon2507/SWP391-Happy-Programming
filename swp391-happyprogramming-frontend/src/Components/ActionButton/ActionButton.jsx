import React from "react";
import "./ActionButton.css";

const ActionButton = ({ handleClick, type, className }) => {
  return (
    <div
      className={className}
      onClick={handleClick}
    // style={{
    //   backgroundColor: "gray",
    //   borderRadius: "2px",
    //   color: "white",
    //   padding: "2px 5px",
    //   margin: "3px",
    //   cursor: "pointer"
    // }}
    >
      {type}
    </div >
  );
};

export default ActionButton;
