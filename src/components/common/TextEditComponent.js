import React,  {useState} from "react";
import './TextEditComponent.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

    const [text, setText] = useState("")
    console.log(text)
    const outFocus = () => {
        setter((prev) => {
            const newArr = [...prev]
            newArr[row][index] = {...newArr[row][index], data: text}
            return newArr})
    }
    console.log(data)
    return(<div className="textcomponent">
         <ReactQuill theme="snow" modules={modules} defaultValue={data} value={text} onChange={setText} onBlur={() => outFocus()}></ReactQuill>
        
    </div>)

}
// <textarea defaultValue={data} onChange={(e) => setText(e.target.value)} onBlur={() => outFocus()} placeholder="Write text..."></textarea>

export default TextEditComponent