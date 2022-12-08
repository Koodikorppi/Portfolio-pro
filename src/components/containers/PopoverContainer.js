import React, { useState, useRef, useEffect } from "react";
import './PopoverContainer.css'

// this is simple container that shows header to present the contents
// and contents are then passed on from parent
const PopoverContainer = ({ content, header }) => {

  return (
    <div>
    <div className="popover-header">{header}</div>
    <div className="popover-contents">{content}</div>
  </div>
  );
};

export default PopoverContainer;
