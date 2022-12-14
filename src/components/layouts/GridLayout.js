import './GridLayout.css'
import { handleType, handlePreviewType } from "../../utilities/layoutUtils";
import { useContext } from 'react';
import { SectionContext } from '../../contexts/SectionContext';

// this component will handle gridlayout form both in edit or preview mode
const GridLayout = ({data, setter}) => {
    const context = useContext(SectionContext)
    return(<div className="gridlayout">
        {data.map((r, index1) => {
            return(<div className="gridrow" key={"index"+index1}>
                {r.map((d, index2) => {
                    if(context.mode === "edit"){
                        return(handleType(d.type, d.data, index1, index2, setter, context.layout))
                    } else if(context.mode === "preview"){
                        return(handlePreviewType(d.type, d.data, index1, index2, setter, context.layout))
                    }

                })}
            </div>)
        })}
    </div>)

}


export default GridLayout