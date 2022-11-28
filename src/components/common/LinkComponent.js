import React,  {useState} from "react";
import './LinkComponent.css'

const LinkComponent = ({propkey, setter, data}) => {

    const [link, setLink] = useState("")
    const [label, setLabel] = useState("")

    const buildButton = () => {
        setter(prev => {
            return {...prev, [propkey]: {...prev[propkey],  data: `${label}|${link}`}}
        })
    }


    return(<div className="linkcomponent">
        {(data === null || data === undefined) && <div className="linkbuilder">
            <input defaultValue={"...button label"} value={label} type={"text"} onChange={(e) => {setLabel(e.target.value)}}/>
            <input defaultValue={"...url link"} value={link} type={"text"} onChange={(e) => setLink(e.target.value)}/>
            <button onClick={() => buildButton()}>Build link button</button>
            </div>}
        {(data !== null && data !== undefined) && <button onClick={() => {window.open(data.split("|")[1])}}>{data.split("|")[0]}</button>}
    </div>)

}

export default LinkComponent