import React, {useContext, useState} from "react";
import { SectionContext } from "../../contexts/SectionContext";
import './LayoutContents.css'
import ModalUnstyled from '@mui/base/ModalUnstyled';
import Button from '@mui/base/ButtonUnstyled';



const LayoutContents = ({close}) => {
    const context = useContext(SectionContext)
    const [open, setOpen] = useState(false)
    const [current, setCurrent] = useState(context.layout)

    const layouts = ['gridLayout',2]
    const layout_names = ['Grid','Side-scroller']
    const svg_icons = ['grid_layout', 'slides_layout']

    const handleSelect = (e) => {
        if(e !== context.layout){
            setCurrent(e)
            setOpen(true)
        }
    }

    const handleClose = () => {
        setOpen(false)
        setCurrent(context.layout)
    }

    const handleYes = () => {
        setOpen(false)
        close(null)
        context.setLayout(current)
        context.setSectionData([
          [
           {type: ""}
          ]
       ])
    }
    return(<div className="LayoutContents">
        {layouts.map((l, index) => {
            return <button className="layout_button" key={index} onClick={() => handleSelect(l)}>{<img src={`/svg/${svg_icons[index]}.svg`} alt="" ></img> }{layout_names[index]}</button>
        })}
    <ModalUnstyled
        id={"popoverwarn"}
        className="modal"
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className="alert-box">
        <h2 id="child-modal-title">Content loss alert</h2>
          <p id="child-modal-description">
            Changing layout causes all unsaved conents to be lost. Do you wish to continue?
          </p>
          <div className="button-row">
            <Button onClick={handleYes}>Yes</Button>
            <Button onClick={handleClose}>No</Button>
          </div>
        </div>
      </ModalUnstyled>
    </div>)
}

export default LayoutContents;