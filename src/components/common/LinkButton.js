import React, {useContext} from "react";
import { SectionContext } from "../../contexts/SectionContext";
import { loadData } from "../containers/mockupdata";
import './LinkButton.css'


const LinkButton = ({data}) => {
    const context = useContext(SectionContext)

    const handleLoad = (id) => {
        const loadedData = loadData(id)
        context.setLayout(loadedData[0].layout)
        context.setSectionId(loadedData[0].sectionId)
        context.setSectionName(loadedData[0].sectionName)
        let tempdata = {}
        const sectionData = []
        loadedData.forEach(element => {
            if(tempdata[element.slotId] === undefined){
                tempdata[element.slotId] = []
            }
            tempdata[element.slotId].push({index: element.gridId, type: element.type, data: element.value})
        })

        Object.keys(tempdata).forEach((d) => {
            const list = tempdata[d].sort((a, b) => {
                return a.index - b.index;
            });
            sectionData.push(list)
        })
        context.setSectionData(sectionData)
    }


    return(<button className="navlink-button" onClick={() => handleLoad(data.id)}>{data.name}</button>)
}

export default LinkButton