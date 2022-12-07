import React, {useContext, useState} from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { SectionContext } from "../../contexts/SectionContext";
import GridLayout from "../layouts/GridLayout";
import './SectionContainer.css'
import { useHttpClient } from "../../hooks/useHttpClient";
import { v4 as uuidv4 } from 'uuid';
import SliderLayout from "../layouts/SliderLayout";

const SectionContainer = () => {
    const context = useContext(SectionContext)
    const auth = useContext(AuthContext)
    const {isLoading, error, sendRequest} = useHttpClient();
    const [edit, setEdit] = useState(false)
    console.log(context.navLinks)
    const handleSave = async () => {
        if(context.sectionName !== ""){
            const dataJson = []
            let currSection = context.sectionId !== null ? context.sectionId : uuidv4()
            let position = 0;
            let navIndex = 0;
            if(context.sectionId === null && context.navLinks.length > 0){
              position = context.navLinks[context.navLinks.length - 1].position + 1
            } else if (context.navLinks.length > 0){
              navIndex = context.navLinks.findIndex((d) => {
                return d.id === currSection
              })
              position = context.navLinks[navIndex].position
            }
            context.sectionData.forEach((e, row) => {
                e.forEach((d, index) => {
                  dataJson.push({posid: index, slotid: row, type: d.type, value: d.data !== undefined ? d.data : "" })
                })

            })
                try {
                    await sendRequest(
                      `https://x4hw8n8xca.execute-api.eu-north-1.amazonaws.com/prod/user/save`,
                      'POST',
                      JSON.stringify({
                        id: currSection,
                        userId: auth.userId,
                        name: context.sectionName,
                        layout: context.layout,
                        background: context.background,
                        position: position,
                        data: dataJson
                      }),
                      {
                        'Content-Type': 'application/json',
                        'authorizationToken': `${auth.token},${auth.userId}`
                      }
                    );
                    if(context.sectionId === null){
                      context.setNavlinks(prev => {
                        return [...prev, {name: context.sectionName, id: currSection, position: position}]
                    })
                    context.setSectionId(currSection)
                    } else {
                      const templist = [...context.navLinks]
                      templist[navIndex].name = context.sectionName;
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

    const handleDel = async () => {
      try {
        await sendRequest(
          `https://x4hw8n8xca.execute-api.eu-north-1.amazonaws.com/prod/user/deletesection`,
          "POST",
          JSON.stringify({
            userId: auth.userId,
            sectionId: context.sectionId
          }),
          {
            "Content-Type": "application/json",
            authorizationToken: `${auth.token},${auth.userId}`,
          }
        );
        context.setNavlinks(prev => {return prev.filter(e => e.id !== context.sectionId)})
        context.setSectionName("Section header...")
        context.setBackground("#018be7")
        context.setLayout("gridLayout")
        context.setSectionData([
          [
           {type: ""}
          ]
       ])
        context.setSectionId(null)
      } catch (error) {
        console.log(error)
      }
    }

    const newSection = () => {
      context.setSectionName("Section header...")
      context.setSectionId(null)
      context.setBackground("#018be7")
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

    const handleEnter = (e) => {
      if(e.key == "Enter"){
        setEdit(false)
      }
    }

    return (
      <div className="section" style={{backgroundColor: context.background}}>
        <div className="topRow">
        <div className="section-header">
          {edit ? <input
            defaultValue={
              context.sectionName
            }
            type={"text"}
            onChange={(e) => context.setSectionName(e.target.value)}
            onBlur={() => setEdit(false)}
            onKeyDown={handleEnter}
            placeholder="Section header..."
          /> : <div className="presentation">
            <h1>{context.sectionName.toUpperCase()}</h1>
            <button onClick={() => setEdit(true)}><img src="/svg/edit.svg" alt="edit"></img></button>
            </div>}
        </div>
        <div className="section-buttons">
        <div className="slotAdd">
            <button onClick={() => addSlot()}>
            <img src="/svg/addrow.svg" className={context.layout+"Add"} alt="Add"></img><span>Add {context.layout === "gridLayout" ? "row" : "slide"}</span>
            </button>
        </div>
        <div className="section-actions">
          {context.activeSection !== null && (
            <button onClick={() => handleDel()}>
              <img src="/svg/whitetrash.svg" alt="Save"></img>
              <span>Delete</span></button>
          )}
          <button onClick={() => handleSave()}>
            <img src="/svg/memcard.svg" alt="Save"></img><span>Save</span>
          </button>
          {context.activeSection !== null && (
            <button onClick={() => newSection()}>
              <img src="/svg/addsection.svg" alt="Save"></img>
              <span>Add Section</span></button>
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
          {context.layout === "sliderLayout" &&
          <SliderLayout
          data={context.sectionData}
          setter={context.setSectionData}/>}
        </div>
      </div>
    );
}

export default SectionContainer