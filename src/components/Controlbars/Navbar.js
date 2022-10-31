import React, {useContext} from "react";
import {SectionContext} from '../../contexts/SectionContext'
import LinkButton from "../common/LinkButton";
import './Navbar.css'

const Navbar = () => {

    const {navLinks} = useContext(SectionContext)

    return(<div className="Navbar">
        {navLinks.map((l) => {
            return(<LinkButton/>)
        })}

    </div>)
}

export default Navbar;