import React,  {useState} from "react";
import './TextEditComponent.css'

const TextEditComponent = ({propkey, setter, data}) => {

    const [text, setText] = useState("")

    const outFocus = () => {
        setter(prev => {
            return {...prev, [propkey]: {...prev[propkey],  data: text}}
        })
    }


    return(<div className="textcomponent">
        <textarea defaultValue={data} onChange={(e) => setText(e.target.value)} onBlur={() => outFocus()}></textarea>
    </div>)

}

export default TextEditComponent