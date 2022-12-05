import React from "react";
import "./TypeSelector.css"

const TypeSelector = ({index, row, setter}) => {


    const handleClick = (type) => {
        setter((prev) => {
            const newArr = [...prev]
            newArr[row][index] = {type: type}
            return newArr})
    }


    return(<div className="typeselect">
        <p>Select content type:</p>
            <div className="buttons">
            <button onClick={() => handleClick("text")}>{<img src={`/svg/add_text_icon.svg`} alt="" ></img>} Text</button>
            <button onClick={() => handleClick("image")}>{<img src={`/svg/add_image_icon.svg`} alt="" ></img>} Image</button>
            <button onClick={() => handleClick("video")}>{<img src={`/svg/add_video_icon.svg`} alt="" ></img>} Video</button>
            <button onClick={() => handleClick("button")}>{<img src={`/svg/add_button_icon.svg`} alt="" ></img>} Linkbutton</button>
            <button onClick={() => handleClick("empty")}>Empty</button>
            </div>
    </div>)
}

export default TypeSelector