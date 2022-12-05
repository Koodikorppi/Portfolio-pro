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
    const {isLoading, sendRequest} = useHttpClient();

    const handleSave = async () => {
        if(context.sectionName !== ""){
            const dataJson = []
            let currSection = context.sectionId !== null ? context.sectionId : uuidv4()
            context.sectionData.forEach((e, row) => {
                e.forEach((d, index) => {
                  dataJson.push({gridId: index, slotId: row, layout: context.layout, sectionId: currSection, sectionName: context.sectionName, type: d.type, value: d.data })
                })

            })
                try {
                    saveData(dataJson)
                    /*await sendRequest(
                      `https://x4hw8n8xca.execute-api.eu-north-1.amazonaws.com/prod/user/save`,
                      'POST',
                      JSON.stringify({
                        data: dataJson
                      }),
                      {
                        'Content-Type': 'application/json',
                        'authorizationToken': `${auth.token},${auth.userId}`
                      }
                    );*/
                    if(context.sectionId === null){
                      context.setNavlinks(prev => {
                        return [...prev, {name: context.sectionName, id: currSection}]
                    })
                    context.setSectionId(currSection)
                    } else {
                      const index = context.navLinks.findIndex((d) => {
                        if(d.id === currSection){
                          return true;
                        }
                      })
                      const templist = [...context.navLinks]
                      templist[index].name = context.sectionName;
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
      deleteData(context.sectionId)
      context.setNavlinks(prev => {return prev.filter(e => e.id !== context.sectionId)})
      context.setSectionName("")
      context.setBackground(null)
      context.setLayout("gridLayout")
      context.setSectionData([
        [
         {type: ""}
        ]
     ])
      context.setSectionId(null)

    }

    const newSection = () => {
      context.setSectionName("")
      context.setSectionId(null)
      context.setBackground(null)
      context.setLayout("gridLayout")
      context.setSectionData([
        [
         {type: ""}
        ]
     ])
      context.setSectionId(null)
    }

    const addSlot = () => {
      context.setSectionData(prev => {
        return [...prev, [{type: ""}]]
      })
    }

    return (
      <div className="section">
        <div className="topRow">
        <div className="section-header">
          <input
            defaultValue={
              context.sectionName
            }
            type={"text"}
            onChange={(e) => context.setSectionName(e.target.value)}
            placeholder="Section header..."
          />
        </div>
        <div className="section-buttons">
        <div className="slotAdd">
            <button onClick={() => addSlot()}>
            <img src="/svg/plus_icon.svg" alt="Add"></img> add row
            </button>
        </div>
        <div className="section-actions">
          {context.activeSection !== null && (
            <button onClick={() => handleDel()}>Delete</button>
          )}
          <button onClick={() => handleSave()}>
            <img src="/svg/memcard.svg" alt="Save"></img>Save
          </button>
          {context.activeSection !== null && (
            <button onClick={() => newSection()}>Create new</button>
          )}
        </div>
        </div>
        </div>
        <div className="section-content">
          {context.layout === "gridLayout" && (
            <GridLayout
              data={context.sectionData}
              setter={context.setSectionData}
            />
          )}
        </div>
      </div>
    );
}

export default SectionContainer