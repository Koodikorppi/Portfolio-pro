import React, {useContext, useState} from "react";
import SwitchUnstyled from '@mui/base/SwitchUnstyled';
import './AccountContents.css'



// this component handles user settings like changing username, email or password. User can also delete account and decide if current portfolio has public viewing on.
const AccountContents = () => {
    const [active, setActive] = useState("")


    const changePublic = (e) => {

    }

    const handleNameChange = () => {

    }

    const handleEmailChange = () => {

    }

    const handlePasswordChange = () => {

    }


    return(<div className="accountContents">
        <button onClick={() => setActive("name")}>Change userName</button>
        <button onClick={() => setActive("email")}>Change Email</button>
        <button onClick={() => setActive("password")}>Change password</button>
        <button>Delete Account</button>
        <SwitchUnstyled defaultChecked onChange={(e) => changePublic(e.target.value)}/>

    </div>)
}

export default AccountContents;