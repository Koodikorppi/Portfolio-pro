import React, {useContext, useState} from "react";
import { SectionContext } from "../../contexts/SectionContext";
import GridLayout from "../layouts/GridLayout";
import './SectionContainer.css'

const SectionContainer = () => {
    const context = useContext(SectionContext)
    const [save, setSave] = useState(false)
    const [del, setDel] = useState(false)
    const [header, setHeader] = useState("")

    return(<div className="section">
        <div className="section-header"><input type={"text"} onChange={(e) => setHeader(e.target.value)} placeholder="Section header..."/></div>
        <div className="section-content">{context.layout === 1 && <GridLayout data={null}/>}</div>
        <div className="section-save">
            <button onClick={() => setDel(!del)}>Delete</button>
            <button onClick={() => setSave(!save)}><img src="/svg/memcard.svg" alt="Save"></img>Save</button>
            </div>
    </div>)
}

export default SectionContainer