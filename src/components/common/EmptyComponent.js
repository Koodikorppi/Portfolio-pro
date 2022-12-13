import React, {useContext} from "react";
import { SectionContext } from "../../contexts/SectionContext";
import "./EmptyComponent.css"


// this is the bacis empty component that is used to add new type components to grid or slider layout
const EmptyComponent = ({index, row, setter}) => {
    const context = useContext(SectionContext)
    const handleClick = () => {
        setter((prev) => {
             const newArr = [...prev]
             newArr[row][index] = {type: 'select'}
             if((context.layout === "sliderLayout" && index < 1) || context.layout === "gridLayout"){
                newArr[row][index + 1] = {type: ""}
             }
             return newArr})
    }

    return(<div className="plus-box">
        <button className="plus_icon" onClick={() => handleClick()}>{<img src={`/svg/plus_icon.svg`} alt="" ></img>}</button>
    </div>)

}

export default EmptyComponent