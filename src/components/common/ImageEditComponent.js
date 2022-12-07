import React, { useContext } from "react";
import { SectionContext } from "../../contexts/SectionContext";
import './ImageEditComponent.css'

const ImageEditComponent = ({index, row, setter, data}) => {

    const context = useContext(SectionContext)
    const imageSettings = (val) => {
        if(data !== null){
              URL.revokeObjectURL(data)
        }
        console.log(row)
        console.log(index)
        setter((prev) => {
                 const newArr = [...prev]
                 newArr[row][index] = {...newArr[row][index], data: val}
                 return newArr})
    }


    return(<div className="imagecomponent">
        {((data === null || data === undefined) && context.mode !== "preview") && <div>
            <label className="custom-file-upload" htmlFor={`imageSelec-${row}-${index}`}>{<img src={`/svg/camera_icon.svg`} alt="" ></img> } Select image</label>
            <input id={`imageSelec-${row}-${index}`} onInput={(e) => imageSettings( URL.createObjectURL(e.target.files[0]))} type="file"></input>
        </div>}
        {(data !== undefined && data !== null) && <img className="imageStyle" src={data}  width={"100%"} height={"100%"} alt={data} />}
    </div>)

}

export default ImageEditComponent