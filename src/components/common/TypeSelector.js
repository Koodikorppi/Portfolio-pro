import React from "react";
import "./TypeSelector.css"

const TypeSelector = ({propkey, setter}) => {


    const handleClick = (type) => {
        setter((prev) => {
             return {...prev, [propkey]: {type: type}}})
    }

    return(<div className="typeselect">
        <p>Select content type</p>
        <button onClick={() => handleClick("text")}>Text</button>
        <button onClick={() => handleClick("image")}>Image</button>
        <button onClick={() => handleClick("video")}>Video</button>
    </div>)
}

export default TypeSelector