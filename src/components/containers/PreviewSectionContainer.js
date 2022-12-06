import React, {useContext, useState} from "react";
import { SectionContext } from "../../contexts/SectionContext";
import GridLayout from "../layouts/GridLayout";
import './SectionContainer.css'


const PreviewSectionContainer = () => {
    const context = useContext(SectionContext)

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
        </div>
      </div> : <></>
    );
}

export default PreviewSectionContainer