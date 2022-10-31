import React from "react";
import PopoverButton from "../common/PopoverButton";
import './Sidebar.css'

const Sidebar = () => {
    return(<div className="Sidebar">
        <PopoverButton header={'Account'} name={'Account'}/>
        <PopoverButton header={'Settings'} name={'Settings'}/>
        <PopoverButton header={'Text'} name={'Text'}/>
        <PopoverButton header={'Font'} name={'Font'}/>
        <PopoverButton header={'Layouts'} name={'Layouts'}/>
        <PopoverButton header={'Backgrounds'} name={'Backgrounds'}/>
    </div>)
}

export default Sidebar;