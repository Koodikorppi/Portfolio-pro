import React, {useState, useEffect} from "react";
import EmptyComponent from "../common/EmptyComponent";
import ImageEditComponent from "../common/ImageEditComponent";
import TextEditComponent from "../common/TextEditComponent";
import TypeSelector from "../common/TypeSelector";
import VideoEditComponent from "../common/VideoEditComponent";
import './GridLayout.css'

const GridLayout = ({data, save}) => {

    const [boxes, setBoxes] = useState(
        {
            0: {type: ""},
            1: {type: ""},
            2: {type: ""},
            3: {type: ""},
            4: {type: ""},
            5: {type: ""},
            6: {type: ""},
            7: {type: ""},
        }
    )

    useEffect(() => {
        if(data !== null && data !== undefined){
            setBoxes(data)
        }
    }, [data])

    const handleType = (type, propkey, data) => {
        console.log('rendered')
        console.log(boxes)
        switch(type){
            case "":
                return(<div className="container"><EmptyComponent propkey={propkey} setter={setBoxes}/></div>)
            case "select":
                return(<div className="container"><TypeSelector propkey={propkey} setter={setBoxes}/></div>)
            case "text":
                return(<div className="container"><TextEditComponent propkey={propkey} setter={setBoxes} data={data}/></div>)
            case "video":
                return(<div className="container"><VideoEditComponent propkey={propkey} setter={setBoxes} data={data}/></div>)
            case "image":
                return(<div className="container"><ImageEditComponent propkey={propkey} setter={setBoxes} data={data}/></div>)
            default:
                return(<></>)
        }
    }

    return(<div className="gridlayout">
        <div className="gridrow">
            {Object.keys(boxes).slice(0,4).map((d) => {
                return(handleType(boxes[d].type, d, boxes[d].data))
            })}
        </div>
        <div className="gridrow">
        {Object.keys(boxes).slice(4,8).map((d) => {
                return(handleType(boxes[d].type, d, boxes[d].data))
            })}
        </div>

    </div>)

}


export default GridLayout