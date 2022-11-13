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
        <div>Select image  <input  id="imageSelect" onInput={(e) => imageSettings( URL.createObjectURL(e.target.files[0]))} type="file"></input></div>
        {(data !== undefined && data !== null) && <img src={data}  width={300} height={300}></img>}
    </div>)

}

export default ImageEditComponent