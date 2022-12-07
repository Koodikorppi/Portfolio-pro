import React, { useContext } from "react";
import { SectionContext } from "../../contexts/SectionContext";
import './VideoEditComponent.css'
import { AuthContext } from "../../contexts/AuthContext";
import { useHttpClient } from "../../hooks/useHttpClient";
import axios from "axios";
import { LoadingNotif } from "./LoadingNotif";

const VideoEditComponent = ({index, row, setter, data}) => {
    const {isLoading, error, sendRequest} = useHttpClient();
    const context = useContext(SectionContext)
    const auth = useContext(AuthContext)
    const videoSettings = async (val) => {
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


    return(<div className="videocomponent">
        {((data === null || data === undefined) && context.mode !== "preview") &&
        <div>
         <input  id={`videoSelect-${row}-${index}`} onInput={(e) => videoSettings(e.target.files[0])} type="file"/></div>}
        {(data !== undefined && data !== null) && <video className="videoStyle" src={data} controls></video>}
        <LoadingNotif state={isLoading}/>
    </div>)

}

export default VideoEditComponent