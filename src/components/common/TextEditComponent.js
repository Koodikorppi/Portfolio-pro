import React, {useState, useContext} from "react";
import './TextEditComponent.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { SectionContext } from "../../contexts/SectionContext";

const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }

const TextEditComponent = ({index, row, setter, data}) => {

    const context = useContext(SectionContext)
    const updateText = (e) => {
        setter((prev) => {
            const newArr = [...prev]
            newArr[row][index] = {...newArr[row][index], data: e}
            return newArr})
    }
    console.log(data)
    return(<div className="textcomponent">
        {(data === null || data === undefined || context.mode !== "preview") &&
        <ReactQuill theme="snow" modules={modules} value={data} onChange={(e) => updateText(e)}></ReactQuill>}
        {(data !== undefined && data !== null && context.mode === "preview") && <div dangerouslySetInnerHTML={{__html: data}}></div>}


    </div>)

}
// <textarea defaultValue={data} onChange={(e) => setText(e.target.value)} onBlur={() => outFocus()} placeholder="Write text..."></textarea>

export default TextEditComponent