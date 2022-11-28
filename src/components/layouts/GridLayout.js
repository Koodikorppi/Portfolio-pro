import './GridLayout.css'
import { handleType } from "./layoutUtils";

const GridLayout = ({data, setter}) => {

    return(<div className="gridlayout">
        <div className="gridrow">
            {Object.keys(data).slice(0,4).map((d) => {
                return(handleType(data[d].type, d, data[d].data, setter))
            })}
        </div>
        <div className="gridrow">
        {Object.keys(data).slice(4,8).map((d) => {
                return(handleType(data[d].type, d, data[d].data, setter))
            })}
        </div>

    </div>)

}


export default GridLayout