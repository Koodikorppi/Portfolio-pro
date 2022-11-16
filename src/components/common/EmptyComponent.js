import React from "react";

const EmptyComponent = ({propkey, setter}) => {

    const handleClick = () => {
        console.log(propkey)
        setter((prev) => {
             return {...prev, [propkey]: {type: 'select'}}})
    }

    return(<div>
        <button onClick={() => handleClick()}>+</button>
    </div>)

}

export default EmptyComponent