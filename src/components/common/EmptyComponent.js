import React from "react";

const EmptyComponent = ({index, row, setter}) => {

    const handleClick = () => {
        setter((prev) => {
             console.log(prev)
             const newArr = [...prev]
             newArr[row][index] = {type: 'select'}
             newArr[row][index + 1] = {type: ""}
             return newArr})
    }

    return(<div>
        <button className="plus_icon" onClick={() => handleClick()}>{<img src={`/svg/plus_icon.svg`} alt="" ></img>}</button>
    </div>)

}

export default EmptyComponent