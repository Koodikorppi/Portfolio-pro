import React, {useContext, useEffect} from "react";
import { SectionContext } from "../../contexts/SectionContext";
import GridLayout from "../layouts/GridLayout";
import './SectionContainer.css'
import SliderLayout from "../layouts/SliderLayout";
import { useHttpClient } from "../../hooks/useHttpClient";
import { AuthContext } from "../../contexts/AuthContext";
import { LoadingNotif } from "../common/LoadingNotif";


const PreviewSectionContainer = () => {
    const context = useContext(SectionContext)
    const auth = useContext(AuthContext)
    const {isLoading, error, sendRequest} = useHttpClient();

    const getFirst = async (id, name) => {
      try {
        const response = await sendRequest(
          `https://x4hw8n8xca.execute-api.eu-north-1.amazonaws.com/prod/loadpreviewcomponents`,
          "POST",
          JSON.stringify({
            url: window.location.href,
            sectionId: id,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        context.setSectionName(name);
        context.setSectionId(id);
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

    useEffect(() => {
      if(context.navLinks.length > 0){
      getFirst(context.navLinks[0].id, context.navLinks[0].name)
      }
    }, [context.navLinks])

    return (
      context.sectionId ? <div className="preview-section" style={{backgroundColor: context.background}}>
        <div className="preview-topRow">
        <div className="preview-section-header">
          <h1>{context.sectionName.toUpperCase()}</h1>
        </div>
        </div>
        <div className="preview-section-content">
          {context.layout === "gridLayout" && (
            <GridLayout
              data={context.sectionData}
              setter={context.setSectionData}
            />
          )}
          {context.layout === "sliderLayout" &&
          <SliderLayout
          data={context.sectionData}
          setter={context.setSectionData}/>}
        </div>
        <LoadingNotif state={isLoading}/>
      </div> : <></>
    );
}

export default PreviewSectionContainer