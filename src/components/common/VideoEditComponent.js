import React from "react";
import './VideoEditComponent.css'

const VideoEditComponent = ({propkey, setter, data}) => {

    const videoSettings = (val) => {
        if(data !== null){
              URL.revokeObjectURL(data)
        }
        setter(prev => {
            return {...prev, [propkey]: {...prev[propkey],  data: val}}
        })
    }


    return(<div className="videocomponent">
        {(data === undefined || data === null) &&
        <div>
         <input  id="videoSelect" onInput={(e) => videoSettings( URL.createObjectURL(e.target.files[0]))} type="file"/></div>}
        {(data !== undefined && data !== null) && <video className="videoStyle" src={data} controls></video>}
    </div>)

}

export default VideoEditComponent