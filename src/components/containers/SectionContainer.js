import React from "react";
import './SectionContainer.css'

const SectionContainer = () => {
    return(<div className="section">
        <div className="section-header"></div>
        <div className="section-content"></div>
        <div className="section-save"><button><img src="/svg/memcard.svg" alt="Save"></img>Save</button></div>
    </div>)
}

export default SectionContainer