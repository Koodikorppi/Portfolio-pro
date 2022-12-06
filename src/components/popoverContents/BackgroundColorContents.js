import React, {useContext, useState} from "react";
import { SectionContext } from "../../contexts/SectionContext";
import './BackgroundColorContents.css'
import ModalUnstyled from '@mui/base/ModalUnstyled';
import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import { SketchPicker } from 'react-color';


const BackgroundColorContents = () => {
    const context = useContext(SectionContext)
    const [open, setOpen] = useState(false)
    const [color, setColor] = useState('#000000')

    return (<div className="BackgroundContents">
            <div className="colorpicker">
                <SketchPicker
                    color={color}
                    onChange={e => setColor(e.hex)} />
                <ButtonUnstyled
                    data-cy="password_submit_btn"
                    onClick={() => context.setBackground(color)}
                >
                    Save
                </ButtonUnstyled>
            </div>
    </div>)
}

export default BackgroundColorContents;