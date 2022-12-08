import React, {useContext} from "react";
import { SectionContext } from "../../contexts/SectionContext";
import './LinkButton.css'
import { useHttpClient } from "../../hooks/useHttpClient";
import { AuthContext } from "../../contexts/AuthContext";
import { LoadingNotif } from "./LoadingNotif";

// this component represents nav link buttons
// it handles fetcing section spesific data from api gateway based on section id
const LinkButton = ({data}) => {
    const context = useContext(SectionContext)
    const auth = useContext(AuthContext)
    const {isLoading, error, sendRequest} = useHttpClient();

    const handleLoad = async (id) => {
      try {
        const response = await sendRequest(
          `https://x4hw8n8xca.execute-api.eu-north-1.amazonaws.com/prod/user/loadcomponents`,
          "POST",
          JSON.stringify({
            sectionId: id,
          }),
          {
            "Content-Type": "application/json",
            'authorizationToken': `${auth.token},${auth.userId}`
          }
        );
        context.setSectionName(data.name);
        context.setSectionId(data.id);
        context.setLayout(response.layout);
        context.setBackground(response.background);
        let tempdata = {};
        const sectionData = [];
        response.components.forEach((element) => {
          if (tempdata[element.slotid] === undefined) {
            tempdata[element.slotid] = [];
          }
          tempdata[element.slotid].push({
            index: element.posid,
            type: element.type,
            data: element.value,
          });
        });

        Object.keys(tempdata).forEach((d) => {
          const list = tempdata[d].sort((a, b) => {
            return a.index - b.index;
          });
          sectionData.push(list);
        });
        context.setSectionData(sectionData);
      } catch (error) {
        console.log(error)
      }
    };


    return(<><LoadingNotif state={isLoading}/><button className="navlink-button" onClick={() => handleLoad(data.id)}>{data.name}</button></>)
}

export default LinkButton