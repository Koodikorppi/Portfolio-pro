import React from 'react';
import './SliderLayout.css'
import { handleType, handlePreviewType } from "../../utilities/layoutUtils";
import { useContext } from 'react';
import { SectionContext } from '../../contexts/SectionContext';

// this component will handle sliderlayout form both in edit or preview mode
const SliderLayout = ({data, setter}) => {
    const context = useContext(SectionContext)
    return(<div className="sliderlayout">
        <div className='slider-box'>
        {data.map((r, index1) => {
            return(<div className="slide" key={"index"+index1}>
                {r.map((d, index2) => {
                    if(context.mode === "edit"){
                        return(handleType(d.type, d.data, index1, index2, setter, context.layout))
                    } else if(context.mode === "preview"){
                        return(handlePreviewType(d.type, d.data, index1, index2, setter, context.layout))
                    }

                })}
            </div>)
        })}

        </div>

    </div>)

}


export default SliderLayout