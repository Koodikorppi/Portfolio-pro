import React, { useState, useContext } from "react";
import { Sidebar } from "semantic-ui-react";
import Navbar from "../components/Controlbars/Navbar";
import { AuthContext } from "../contexts/AuthContext";


export const UserPage = () => {

  const [activeItem, setActiveitem] = useState('home')
  const auth = useContext(AuthContext)

  console.log(activeItem)
  if(auth.isLoggedIn){
  return (
    <div style={{display: 'flex'}}>
      <div><Navbar/></div>
      <div>
        <div><Sidebar/></div>
        <div></div>
      </div>
    </div>)
    } else {
      <div>
        Need to be logged in to access
      </div>
    }
}

export default UserPage;