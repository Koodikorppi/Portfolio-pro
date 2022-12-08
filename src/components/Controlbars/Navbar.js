import React, {useContext} from "react";
import {SectionContext} from '../../contexts/SectionContext'
import LinkButton from "../common/LinkButton";
import PreviewLinkButton from "../common/PreviewLinkButton";
import './Navbar.css'

const style = {
    preview: "preview-navbar",
    edit: "edit-navbar"
}

// simplre navbar to present the section links
const Navbar = () => {

    const {navLinks, mode} = useContext(SectionContext)

    return(<div className={style[mode]}>
        {navLinks.map((l, index) => {
            return(mode === "edit" ? <LinkButton key={index} data={l}/> : <PreviewLinkButton key={index} data={l}/>)
        })}

    </div>)
}

export default Navbar;