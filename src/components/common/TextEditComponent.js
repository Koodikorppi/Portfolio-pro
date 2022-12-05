import React,  {useState} from "react";
import './TextEditComponent.css'

const TextEditComponent = ({index, row, setter, data}) => {

    const [text, setText] = useState("")

    const outFocus = () => {
        setter((prev) => {
            const newArr = [...prev]
            newArr[row][index] = {...newArr[row][index], data: text}
            return newArr})
    }

    return(<div className="textcomponent">
        <textarea defaultValue={data} onChange={(e) => setText(e.target.value)} onBlur={() => outFocus()} placeholder="Write text..."></textarea>
    </div>)

}

export default TextEditComponent