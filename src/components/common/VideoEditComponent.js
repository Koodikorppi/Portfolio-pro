import React from "react";
import './VideoEditComponent.css'

const VideoEditComponent = ({index, row, setter, data}) => {

    const videoSettings = (val) => {
        if(data !== null){
              URL.revokeObjectURL(data)
        }
        setter((prev) => {
            const newArr = [...prev]
            newArr[row][index] = {...newArr[row][index], data: val}
            return newArr})
    }


    return(<div className="videocomponent">
        {(data === undefined || data === null) &&
        <div>
         <input  id="videoSelect" onInput={(e) => videoSettings( URL.createObjectURL(e.target.files[0]))} type="file"/></div>}
        {(data !== undefined && data !== null) && <video className="videoStyle" src={data} controls></video>}
    </div>)

}

export default VideoEditComponent