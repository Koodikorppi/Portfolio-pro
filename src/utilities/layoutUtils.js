import EmptyComponent from "../components/common/EmptyComponent";
import ImageEditComponent from "../components/common/ImageEditComponent";
import TextEditComponent from "../components/common/TextEditComponent";
import TypeSelector from "../components/common/TypeSelector";
import VideoEditComponent from "../components/common/VideoEditComponent";
import LinkComponent from "../components/common/LinkComponent";


// this handles single container deletion in section
const handleDelete = (index, row, setter) => {
    setter(prev => {
        prev[row].splice(index, 1)
        const length = prev[row].length
        if(length == 0){
            prev.splice(row, 1)
        }

        return [...prev]
    })
}

// this handles returning back to typeselection in single container
const selectRepick = (index, row, setter) => {
    setter((prev) => {
        const newArr = [...prev]
        newArr[row][index] = {type: "select"}
        return newArr})
}

// this funciton is used to determine which type of container should be presented
const handleType = (type, data, row, index, setter, layout) => {
  switch (type) {
    case "":
      return (
        <div key={index} className={layout + "-container"}>
          {<button
            onClick={() => handleDelete(index, row, setter)}
            className="trash_icon"
          >
            <img src="/svg/trash.svg" alt="delete"></img>
          </button>}
          <EmptyComponent index={index} row={row} setter={setter} />
        </div>
      );
    case "empty":
      return (
        <div key={index} className={layout + "-emptyContainer"}>
          <button
            onClick={() => handleDelete(index, row, setter)}
            className="trash_icon"
          >
            <img src="/svg/trash.svg" alt="delete"></img>{" "}
          </button>
          <button
            onClick={() => selectRepick(index, row, setter)}
            className="re-pick_icon"
          >
            <img src="/svg/repick.svg" alt="re-pick"></img>
          </button>
          <div className={layout +"-empty-contents"}>
            <p>This area will be empty in portfolio</p>
          </div>
        </div>
      );
    case "select":
      return (
        <div key={index} className={layout + "-container"}>
          <button
            onClick={() => handleDelete(index, row, setter)}
            className="trash_icon"
          >
            <img src="/svg/trash.svg" alt="delete"></img>
          </button>
          <TypeSelector index={index} row={row} setter={setter} />
        </div>
      );
    case "text":
      return (
        <div key={index} className={layout + "-container"}>
          <button
            onClick={() => handleDelete(index, row, setter)}
            className="trash_icon"
          >
            <img src="/svg/trash.svg" alt="delete"></img>
          </button>
          <button
            onClick={() => selectRepick(index, row, setter)}
            className="re-pick_icon"
          >
            <img src="/svg/repick.svg" alt="re-pick"></img>
          </button>
          <TextEditComponent
            index={index}
            row={row}
            setter={setter}
            data={data}
          />
        </div>
      );
    case "video":
      return (
        <div key={index} className={layout + "-container"}>
          <button
            onClick={() => handleDelete(index, row, setter)}
            className="trash_icon"
          >
            <img src="/svg/trash.svg" alt="delete"></img>
          </button>
          <button
            onClick={() => selectRepick(index, row, setter)}
            className="re-pick_icon"
          >
            <img src="/svg/repick.svg" alt="re-pick"></img>
          </button>
          <VideoEditComponent
            index={index}
            row={row}
            setter={setter}
            data={data}
          />
        </div>
      );
    case "image":
      return (
        <div key={index} className={layout + "-container"}>
          <button
            onClick={() => handleDelete(index, row, setter)}
            className="trash_icon"
          >
            <img src="/svg/trash.svg" alt="delete"></img>
          </button>
          <button
            onClick={() => selectRepick(index, row, setter)}
            className="re-pick_icon"
          >
            <img src="/svg/repick.svg" alt="re-pick"></img>
          </button>
          <ImageEditComponent
            index={index}
            row={row}
            setter={setter}
            data={data}
          />
        </div>
      );
    case "button":
      return (
        <div key={index} className={layout + "-container"}>
          <button
            onClick={() => handleDelete(index, row, setter)}
            className="trash_icon"
          >
            <img src="/svg/trash.svg" alt="delete"></img>
          </button>
          <button
            onClick={() => selectRepick(index, row, setter)}
            className="re-pick_icon"
          >
            <img src="/svg/repick.svg" alt="re-pick"></img>
          </button>
          <LinkComponent index={index} row={row} setter={setter} data={data} />
        </div>
      );
    default:
      return <></>;
  }
};


// this is the contaner presentation in preview page
const handlePreviewType = (type, data, row, index, setter, layout) => {
  switch (type) {
    case "empty":
      return (
        <div key={index} className={layout + "-preview-container"}>
        </div>
      );
    case "text":
      return (
        <div key={index} className={layout + "-preview-container"}>
          <TextEditComponent
            index={index}
            row={row}
            setter={setter}
            data={data}
          />
        </div>
      );
    case "video":
      return (
        <div key={index} className={layout + "-preview-container"}>
          <VideoEditComponent
            index={index}
            row={row}
            setter={setter}
            data={data}
          />
        </div>
      );
    case "image":
      return (
        <div key={index} className={layout + "-preview-container"}>
          <ImageEditComponent
            index={index}
            row={row}
            setter={setter}
            data={data}
          />
        </div>
      );
    case "button":
      return (
        <div key={index} className={layout + "-preview-container"}>
          <LinkComponent index={index} row={row} setter={setter} data={data} />
        </div>
      );
    default:
      return <></>;
  }
};


export {handleType, handlePreviewType}