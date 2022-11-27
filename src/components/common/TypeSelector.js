import React from "react";
import "./TypeSelector.css"

const TypeSelector = ({propkey, setter}) => {


    const handleClick = (type) => {
        setter((prev) => {
             return {...prev, [propkey]: {type: type}}})
    }
    

    return(<div className="typeselect">
        <p>Select content type:</p>
            <div className="buttons">
            <button onClick={() => handleClick("text")}>{<img src={`/svg/add_text_icon.svg`} alt="" ></img>} Text</button>
            <button onClick={() => handleClick("image")}>{<img src={`/svg/add_image_icon.svg`} alt="" ></img>} Image</button>
            <button onClick={() => handleClick("video")}>{<img src={`/svg/add_video_icon.svg`} alt="" ></img>} Video</button>
            <button onClick={() => handleClick("button")}>{<img src={`/svg/add_button_icon.svg`} alt="" ></img>} Button</button>
            </div>
    </div>)
}

export default TypeSelector