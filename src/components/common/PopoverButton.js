import React, { useState } from "react";
import PopperUnstyled from "@mui/base/PopperUnstyled";

const PopoverButton = ({ content, header, image, name }) => {
  const [anchor, setAnchor] = useState(null);

  const handleState = (e) => {
    setAnchor(anchor ? null : e);
  };

  const open = Boolean(anchor);
  const id = open ? name + "popover" : undefined;
  console.log(image)
  return (
    <div id={name} classname="buttonPart">
      {image !== undefined ? <input
        type={"image"}
        src={image}
        onClick={(e) => handleState(name)}
      ></input> :
      <button onClick={(e) => handleState(name)}>
        {name}
        </button>}
      <PopperUnstyled
        open={open}
        id={id}
        anchorEl={anchor}
        onMouseLeave={(e) => handleState(e)}
      >
        <div className="popover-header">{header}</div>
        <div className="popover-contents">{content}</div>
      </PopperUnstyled>
    </div>
  );
};

export default PopoverButton;