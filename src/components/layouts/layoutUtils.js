import EmptyComponent from "../common/EmptyComponent";
import ImageEditComponent from "../common/ImageEditComponent";
import TextEditComponent from "../common/TextEditComponent";
import TypeSelector from "../common/TypeSelector";
import VideoEditComponent from "../common/VideoEditComponent";
import LinkComponent from "../common/LinkComponent";
import './GridLayout.css'


const handleDelete = (propkey, setter) => {
    setter(prev => {
        return {...prev, [propkey]: {type: ""}}
    })
}

const handleType = (type, propkey, data, setter) => {
    switch(type){
        case "":
            return(<div key={propkey} className="container"><EmptyComponent propkey={propkey} setter={setter}/></div>)
        case "select":
            return(<div key={propkey} className="container"><TypeSelector propkey={propkey} setter={setter}/></div>)
        case "text":
            return(<div key={propkey} className="container"><button onClick={() => handleDelete(propkey, setter)} className="trash_icon"><img src="/svg/trash.svg" alt="delete"></img></button><TextEditComponent propkey={propkey} setter={setter} data={data}/></div>)
        case "video":
            return(<div key={propkey} className="container"><button onClick={() => handleDelete(propkey, setter)} className="trash_icon"><img src="/svg/trash.svg" alt="delete"></img></button><VideoEditComponent propkey={propkey} setter={setter} data={data}/></div>)
        case "image":
            return(<div key={propkey} className="container"><button onClick={() => handleDelete(propkey, setter)} className="trash_icon"><img src="/svg/trash.svg" alt="delete"></img></button><ImageEditComponent propkey={propkey} setter={setter} data={data}/></div>)
        case "button":
            return(<div key={propkey} className="container"><button onClick={() => handleDelete(propkey, setter)} className="trash_icon"><img src="/svg/trash.svg" alt="delete"></img></button><LinkComponent propkey={propkey} setter={setter} data={data}/></div>)
        default:
            return(<></>)
    }
}


export {handleType}