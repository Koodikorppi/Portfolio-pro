import React from "react";

const EmptyComponent = ({propkey, setter}) => {

    const handleClick = () => {
        setter((prev) => {
             return {...prev, [propkey]: {type: 'select'}}})
    }

    return(<div>
        <button className="plus_icon" onClick={() => handleClick()}>{<img src={`/svg/plus_icon.svg`} alt="" ></img>}</button>
    </div>)

}

export default EmptyComponent