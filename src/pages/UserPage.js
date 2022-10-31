import React, { useState, useContext } from "react";
import Sidebar from "../components/controlbars/Sidebar";
import SectionContainer from "../components/containers/SectionContainer";
import Navbar from "../components/controlbars/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import './UserPage.css'

export const UserPage = () => {
  const [activeItem, setActiveitem] = useState("home");
  const auth = useContext(AuthContext);
  console.log('userpage')
  console.log(activeItem);
  console.log(auth.isLoggedIn)
  if (auth.isLoggedIn) {
    return (
      <div className="Userpage">
        <Sidebar />
        <div className="Column">
          <Navbar />
          <SectionContainer />
        </div>
      </div>
    );
  } else {
    <div>Need to be logged in to access</div>;
  }
};

export default UserPage;