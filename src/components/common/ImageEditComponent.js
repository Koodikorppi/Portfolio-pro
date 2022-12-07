import React, { useContext } from "react";
import { SectionContext } from "../../contexts/SectionContext";
import './ImageEditComponent.css'
import axios from 'axios';
import { useHttpClient } from "../../hooks/useHttpClient";
import { AuthContext } from "../../contexts/AuthContext";

const ImageEditComponent = ({index, row, setter, data}) => {
    const {isLoading, error, sendRequest} = useHttpClient();
    const context = useContext(SectionContext)
    const auth = useContext(AuthContext)
    const imageSettings = async (val) => {
        let url = ""
        try {
            let file = val;
            let fileParts = val.name.split('.');
            let fileName = fileParts[0];
            let fileType = fileParts[1];
            const response = await sendRequest("https://x4hw8n8xca.execute-api.eu-north-1.amazonaws.com/prod/user/getsignedurl",
            "POST",
            JSON.stringify({
              fileName : fileName,
              fileType : fileType
            }),
            {
              'Content-Type': 'application/json',
              'authorizationToken': `${auth.token},${auth.userId}`
            }

            )
              let signedRequest = response.url;
              url = "https://portfoliopro.s3.eu-north-1.amazonaws.com/" + fileName;

              const options = {
                headers: {
                  'Content-Type': fileType,
                }
              };
              await axios.put(signedRequest,file,options)

        } catch (error) {
            console.log(error)
        }
        setter((prev) => {
                 const newArr = [...prev]
                 newArr[row][index] = {...newArr[row][index], data: url}
                 return newArr})
    }


    return(<div className="imagecomponent">
        {((data === null || data === undefined) && context.mode !== "preview") && <div>
            <label className="custom-file-upload" htmlFor={`imageSelec-${row}-${index}`}>{<img src={`/svg/camera_icon.svg`} alt="" ></img> } Select image</label>
            <input id={`imageSelec-${row}-${index}`} onInput={(e) => imageSettings(e.target.files[0])} type="file"></input>
        </div>}
        {(data !== undefined && data !== null) && <img className="imageStyle" src={data}  width={"100%"} height={"100%"} alt={data} />}
    </div>)

}

export default ImageEditComponent