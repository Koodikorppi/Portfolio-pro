import React, {useContext, useState} from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { SectionContext } from "../../contexts/SectionContext";
import GridLayout from "../layouts/GridLayout";
import './SectionContainer.css'
import { useHttpClient } from "../../hooks/useHttpClient";
import { v4 as uuidv4 } from 'uuid';
import { saveData, deleteData } from "./mockupdata";

const SectionContainer = () => {
    const context = useContext(SectionContext)
    const [header, setHeader] = useState("")
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest} = useHttpClient();

    const handleSave = async () => {
        if(header !== "" || context.activeSection !== null){
            const dataJson = []
            let currSection = context.activeSection !== null ? {name: header, id: context.activeSection.id} : {name: header, id: uuidv4()}
            Object.keys(context.sectionData).forEach(e => {
                dataJson.push({gridId: e, layout: context.layout, sectionId: currSection.id, sectionName: currSection.name, type: context.sectionData[e].type, value: context.sectionData[e].data })
            })
                try {
                    console.log(dataJson)
                    //saveData(dataJson)
                    await sendRequest(
                      `https://x4hw8n8xca.execute-api.eu-north-1.amazonaws.com/prod/user/save`,
                      'POST',
                      JSON.stringify({
                        data: dataJson
                      }),
                      {
                        'Content-Type': 'application/json',
                        'authorizationToken': `${auth.token},${auth.userId}`
                      }
                    );
                    if(context.activeSection === null){
                      context.setNavlinks(prev => {
                        return [...prev, currSection]
                    })
                    context.setActiveSection(currSection)
                    } else {
                      const index = context.navLinks.findIndex((d) => {
                        if(d.id === context.activeSection.id){
                          return true;
                        }
                      })
                      const templist = [...context.navLinks]
                      templist[index].name = header;
                      context.setNavlinks(templist);
                    }
                  } catch (err) {
                    console.log(err)
                    console.log('failed request')
                  }
        } else {
            alert("need name for section!")
        }
    }

    const handleDel = () => {
      deleteData(context.activeSection.id)
      context.setNavlinks(prev => {return prev.filter(e => e.id !== context.activeSection.id)})
      context.setText(null)
      context.setFont(null)
      context.setBackground(null)
      context.setLayout(null)
      context.setSectionData(null)
      context.setActiveSection(null)

    }

    const newSection = () => {
      context.setText(null)
      context.setFont(null)
      context.setBackground(null)
      context.setLayout(null)
      context.setSectionData(null)
      context.setActiveSection(null)
    }

    return(<div className="section">
        <div className="section-header"><input defaultValue={(context.activeSection !== null) ? context.activeSection.name : "" } type={"text"} onChange={(e) => setHeader(e.target.value)} placeholder="Section header..."/></div>
        <div className="section-content">{context.layout === 'gridLayout' && <GridLayout data={context.sectionData} setter={context.setSectionData}/>}</div>
        <div className="section-save">
            {context.activeSection !== null &&<button onClick={() => handleDel()}>Delete</button>}
            <button onClick={() => handleSave()}><img src="/svg/memcard.svg" alt="Save"></img>Save</button>
            {context.activeSection !== null && <button onClick={() => newSection()}>Create new</button>}
            </div>
    </div>)
}

export default SectionContainer