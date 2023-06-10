import React from "react";
import { useState } from "react";
import "./ActionButton.css";
import { hover } from "@testing-library/user-event/dist/hover";

const ActionButton = ({ handleClick, type, className }) => {
  return (
    <div
      className={className}
      onClick={handleClick}
      style={{
        backgroundColor: "gray",
        borderRadius: "2px",
        color: "white",
        padding: "2px 5px",
        margin: "3px",
        cursor: "pointer"
      }}
    >
      {type}
    </div>
  );
};

export default ActionButton;
