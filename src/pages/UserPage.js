import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../components/Controlbars/Sidebar";
import SectionContainer from "../components/containers/SectionContainer";
import Navbar from "../components/Controlbars/Navbar";
import { SectionContext } from "../contexts/SectionContext";
import './UserPage.css'
import { getSections } from "../components/containers/mockupdata";

export const UserPage = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [text, setText] = useState(null)
  const [font, setFont] = useState(null)
  const [sectionData, setSectionData] = useState(null)
  const [background, setBackground] = useState(null)
  const [navLinks, setNavlinks] = useState([])
  const [layout, setLayout] = useState(null)

  useEffect(() => {
    const links = getSections()
    setNavlinks(links)
  },[])

    return (
      < SectionContext.Provider value={
        {
          text: text,
          font: font,
          background: background,
          navLinks: navLinks,
          layout: layout,
          sectionData: sectionData,
          activeSection: activeSection,
          setText: setText,
          setFont: setFont,
          setBackground: setBackground,
          setNavlinks: setNavlinks,
          setLayout: setLayout,
          setSectionData: setSectionData,
          setActiveSection: setActiveSection
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
};

export default UserPage;
