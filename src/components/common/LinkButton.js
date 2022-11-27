import React, {useContext} from "react";
import { SectionContext } from "../../contexts/SectionContext";
import { loadData } from "../containers/mockupdata";


const LinkButton = ({data}) => {
    const context = useContext(SectionContext)

    const handleLoad = (id) => {
        const loadedData = loadData(id)
        console.log(loadedData)
        context.setLayout(loadedData[0].layout)
        context.setActiveSection({id: loadedData[0].sectionId, name: loadedData[0].sectionName})
        let sectionData = {}
        loadedData.forEach(element => {
            sectionData = {
                ...sectionData,
                [element.gridId]: {type: element.type, data: element.value}
            }
        })
        context.setSectionData(sectionData)
    }


    return(<button onClick={() => handleLoad(data.id)}>{data.name}</button>)
}

export default LinkButton