import React, { useState, useRef, useEffect } from "react";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import './Sidebar.css'
import PopoverContainer from "../common/PopoverContainer";
import LayoutContents from "../popoverContents/LayoutContents";

const Sidebar = () => {
    const [anchor, setAnchor] = useState(null);
    const [header, setHeader] = useState(null);
    const [content, setContent] = useState(null);

    const setLinkActive = () =>{

    }
    const handleState = (header, content) => {
        if(document.getElementById("sidebar-popover") == null){
            setAnchor(document.getElementById("sidebarID"));
        }
        setHeader(header);
        setContent(content)
    };

    const handleOutClick = (e) => {
      if (document.getElementById("sidebar-popover") != null && !document.getElementById("sidebar-popover").contains(e.target) && document.getElementById("popoverwarn") == null) {
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
        <button onClick={() => handleState('Account',  <div></div>) }><img src="/svg/account.svg" alt="Account" className={'Account' === header ? 'active' : ''}></img></button>
        <button onClick={() => handleState('Settings',  <div></div>)}><img src="/svg/cog.svg" alt="Settings" className={'Settings' === header ? 'active' : ''}></img></button>
        <button onClick={() => handleState('Text',  <div></div>)}><img src="/svg/paragraph.svg" alt="Text" className={'Text' === header ? 'active' : ''}></img></button>
        <button onClick={() => handleState('Font',  <div></div>)}><img src="/svg/text.svg" alt="Font" className={'Font' === header ? 'active' : ''}></img></button>
        <button onClick={() => handleState('Layouts',  <LayoutContents/>)}><img src="/svg/layouts.svg" alt="Layouts" className={'Layouts' === header ? 'active' : ''}></img></button>
        <button onClick={() => handleState('Backgrounds',  <div></div>)}><img src="/svg/colors.svg" alt="Backgrounds" className={'Backgrounds' === header ? 'active' : ''}></img></button>
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
