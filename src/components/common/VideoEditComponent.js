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

    console.log(data)
    return(<div className="videocomponent">
        <div>Select video  <input  id="videoSelect" onInput={(e) => videoSettings( URL.createObjectURL(e.target.files[0]))} type="file"></input></div>
        {(data !== undefined && data !== null) && <video src={data}  width={300} height={300} controls></video>}
    </div>)

}

export default VideoEditComponent