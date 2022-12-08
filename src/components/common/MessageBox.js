import React, {useEffect} from "react";

// simple message bos to relay info from request responses
// it will automaticly close after 5s
// it will show either alert styled messages or normal messages
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