import React, { useState, useContext } from "react";
import Sidebar from "../components/Controlbars/Sidebar";
import SectionContainer from "../components/containers/SectionContainer";
import Navbar from "../components/Controlbars/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import './UserPage.css'
import { useNavigate } from 'react-router';

export const UserPage = () => {
  const [activeItem, setActiveitem] = useState("home");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

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
    navigate('/')
  }
};

export default UserPage;
