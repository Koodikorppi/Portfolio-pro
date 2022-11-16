import React, { useState, useContext } from "react";
import Sidebar from "../components/controlbars/Sidebar";
import SectionContainer from "../components/containers/SectionContainer";
import Navbar from "../components/controlbars/Navbar";
import { SectionContext } from "../contexts/SectionContext";
import { AuthContext } from "../contexts/AuthContext";
import './UserPage.css'
import { useNavigate } from 'react-router';

export const UserPage = () => {
  const [activeSection, setActiveSection] = useState("");
  const [text, setText] = useState(null)
  const [font, setFont] = useState(null)
  const [background, setBackground] = useState(null)
  const [navLinks, setNavlinks] = useState([])
  const [layout, setLayout] = useState(null)
  const auth = useContext( AuthContext);
  const navigate = useNavigate();

  if (auth.isLoggedIn) {
    return (
      < SectionContext.Provider value={
        {
          text: text,
          font: font,
          background: background,
          navLinks: navLinks,
          layout: layout,
          setText: setText,
          setFont: setFont,
          setBackground: setBackground,
          setNavlinks: setNavlinks,
          setLayout: setLayout
        }
      }>
      <div className="userpage">
        <Sidebar />
        <div className="column">
          <Navbar />
          <SectionContainer />
        </div>
      </div>
      </ SectionContext.Provider>
    );
  } else {
    navigate('/')
  }
};

export default UserPage;
