import React, {useEffect} from "react";


const MessageBox = ({message, setter, alert}) => {
    console.log(message)
    console.log(alert)
    useEffect(() => {
          setTimeout(() => setter(""), 5000)
        return(() => {
            clearTimeout()
        })
      }, [])
    console.log(alert)
    const classname = alert ? "alert-message" : "message"
    return(<div className={classname}>
        <p>
            {message}
        </p>
    </div>)
}

export {MessageBox}