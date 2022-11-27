import React from "react";
import './ImageEditComponent.css'

const ImageEditComponent = ({propkey, setter, data}) => {

    const imageSettings = (val) => {
        if(data !== null){
              URL.revokeObjectURL(data)
        }
        setter(prev => {
            return {...prev, [propkey]: {...prev[propkey],  data: val}}
        })
    }


    return(<div className="imagecomponent">
        {(data === undefined || data === null) && <div>
            <label className="custom-file-upload" htmlFor="imageSelect">{<img src={`/svg/camera_icon.svg`} alt="" ></img> } Select image</label>
            <input id="imageSelect" onInput={(e) => imageSettings( URL.createObjectURL(e.target.files[0]))} type="file"></input>
        </div>}
        {(data !== undefined && data !== null) && <img className="imageStyle" src={data}  width={"100%"} height={"100%"} alt={data} />}
    </div>)

}

export default ImageEditComponent