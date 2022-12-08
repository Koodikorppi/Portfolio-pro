import React from "react";
import { ModalUnstyled } from "@mui/base";
import { CircularProgress } from "@mui/material";
import "./LoadingNotif.css"

// this is simplre loading component to indicate ongoing fetch
const LoadingNotif = ({state}) => {
    return(<ModalUnstyled
        id={"popoverwarn"}
        className="loader-modal"
        open={state}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className="loader-box">
             <CircularProgress  style={{width: 100, height: 100}}/>
        </div>
      </ModalUnstyled>)
}

export {LoadingNotif}