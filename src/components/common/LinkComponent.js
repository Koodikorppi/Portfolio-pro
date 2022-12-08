import React,  {useContext, useState} from "react";
import { SectionContext } from "../../contexts/SectionContext";
import './LinkComponent.css'

// this component is used to build hyperlink buttons
// user can choose name and link for this button
// only the built button will be shown in preview page
const LinkComponent = ({index, row, setter, data}) => {
    const context = useContext(SectionContext)
    const [link, setLink] = useState("")
    const [label, setLabel] = useState("")
    const [message, setMessage] = useState("Only button will be shown in portfolio")

    const buildButton = () => {
        try {
            new URL(link)
            setter((prev) => {
                const newArr = [...prev]
                newArr[row][index] = {...newArr[row][index], data: `${label}|${link}`}
                return newArr})

        } catch (error) {
            setMessage("Not valid url!")
        }

    }


    return(<div className="linkcomponent">
        {((data === null || data === undefined) && context.mode !== "preview") && <div className="linkbuilder">
            <p>{message}</p>
            <input defaultValue={"...button label"} value={label} type={"text"} onChange={(e) => {setLabel(e.target.value)}} placeholder="Display text..."/>
            <input defaultValue={"...url link"} value={link} type={"text"} onChange={(e) => setLink(e.target.value)} placeholder="url..."/>
            <button onClick={() => buildButton()}>Create link button</button>
            </div>}
        {(data !== null && data !== undefined) && <button className="linkbutton" onClick={() => {window.open(data.split("|")[1])}}>{data.split("|")[0]}</button>}
    </div>)

}

export default LinkComponent