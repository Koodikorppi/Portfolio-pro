import React, { useState, useRef, useEffect } from "react";

const PopoverContainer = ({ content, header }) => {

  return (
    <div
    style={{
      padding: "0.25rem",
      border: "1px solid",
      boxShadow: "0 2px 8px 0 rgba(0,0,0,0.2)",
      backgroundColor: "white"
    }}
  >
    <div className="popover-header">{header}</div>
    <div className="popover-contents">{content}</div>
  </div>
  );
};

export default PopoverContainer;
