import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../components/Controlbars/Sidebar";
import SectionContainer from "../components/containers/SectionContainer";
import Navbar from "../components/Controlbars/Navbar";
import { SectionContext } from "../contexts/SectionContext";
import './UserPage.css'
import { getSections } from "../components/containers/mockupdata";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

export const UserPage = () => {
  const [sectionId, setSectionId] = useState(null)
  const [sectionName, setSectionName] = useState("")
  const [sectionData, setSectionData] = useState(null)
  const [background, setBackground] = useState(null)
  const [navLinks, setNavlinks] = useState([])
  const [layout, setLayout] = useState(null)
  const auth = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    const links = getSections()
    setNavlinks(links)
    setLayout("gridLayout")
    setSectionData([
      [
       {type: ""}
      ]
   ])
  },[])

  if(auth.isLoggedIn){
    return (
      < SectionContext.Provider value={
        {
          sectionId: sectionId,
          sectionName: sectionName,
          background: background,
          navLinks: navLinks,
          layout: layout,
          sectionData: sectionData,
          setSectionId: setSectionId,
          setSectionName: setSectionName,
          setBackground: setBackground,
          setNavlinks: setNavlinks,
          setLayout: setLayout,
          setSectionData: setSectionData,
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
}

export default UserPage;
