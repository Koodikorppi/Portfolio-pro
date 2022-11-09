import React, { useState, useRef, useEffect } from "react";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import './Sidebar.css'
import PopoverContainer from "../common/PopoverContainer";

const Sidebar = () => {
    const [anchor, setAnchor] = useState(null);
    const [header, setHeader] = useState(null);
    const [content, setContent] = useState(null);

    const handleState = (header, content) => {
        if(document.getElementById("sidebar-popover") == null){
            setAnchor(document.getElementById("sidebarID"));
        }
        setHeader(header);
        setContent(content)
    };

    const handleOutClick = (e) => {
      if (document.getElementById("sidebar-popover") != null && !document.getElementById("sidebar-popover").contains(e.target)) {
        setAnchor(null)
    }
    }

    useEffect(() => {
      document.addEventListener("click", handleOutClick, true);
      return () => {
        document.removeEventListener("click", handleOutClick, true);
      };
    }, []);

    const open = Boolean(anchor);
    const id = open ? "sidebar-popover" : undefined;


    return(<div className="Sidebar" id="sidebarID">
        <button onClick={() => handleState('Account',  <div></div>)}>Account</button>
        <button onClick={() => handleState('Settings',  <div></div>)}>Settings</button>
        <button onClick={() => handleState('Text',  <div></div>)}>Text</button>
        <button onClick={() => handleState('Font',  <div></div>)}>Font</button>
        <button onClick={() => handleState('Layouts',  <div></div>)}>Layouts</button>
        <button onClick={() => handleState('Backgrounds',  <div></div>)}>Backgrounds</button>
        <PopperUnstyled
        open={open}
        id={id}
        anchorEl={anchor}
        placement={"right-start"}
      >
        <PopoverContainer header={header} content={content}/>
      </PopperUnstyled>
    </div>)
}

export default Sidebar;