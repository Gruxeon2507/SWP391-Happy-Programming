import React from "react";
import "./ActionButton.css";

const ActionButton = ({ handleClick, type, className }) => {
  return (
    <div
      className={className}
      onClick={handleClick}
    >
      {type}
    </div >
  );
};

export default ActionButton;
