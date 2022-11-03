import React from "react";
import PopoverButton from "../common/PopoverButton";
import './Sidebar.css'

const Sidebar = () => {
    return(<div className="Sidebar">
        <PopoverButton header={'Account'} name={'Account'} image={'account.svg'}/>
        <PopoverButton header={'Settings'} name={'Settings'} image={'coc.svg'}/>
        <PopoverButton header={'Text'} name={'Text'} image={'text.svg'}/>
        <PopoverButton header={'Font'} name={'Font'} image={'text.svg'}/>
        <PopoverButton header={'Layouts'} name={'Layouts'} image={'layouts.svg'}/>
        <PopoverButton header={'Backgrounds'} name={'Backgrounds'} image={'colors.svg'}/>
    </div>)
}

export default Sidebar;