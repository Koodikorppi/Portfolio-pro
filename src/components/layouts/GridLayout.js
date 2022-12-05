import './Layout.css'
import { handleType } from "../../utilities/layoutUtils";

const GridLayout = ({data, setter}) => {

    return(<div className="gridlayout">
        {data.map((r, index1) => {
            return(<div className="gridrow" key={"index"+index1}>
                {r.map((d, index2) => {
                    return(handleType(d.type, d.data, index1, index2, setter))
                })}
            </div>)
        })}
    </div>)

}


export default GridLayout