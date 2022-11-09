import React, { useState, useRef, useEffect } from "react";
import './PopoverContainer.css'
const PopoverContainer = ({ content, header }) => {

  return (
    <div>
    <div className="popover-header">{header}</div>
    <div className="popover-contents">{content}</div>
  </div>
  );
};

export default PopoverContainer;
