import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../components/Controlbars/Sidebar";
import SectionContainer from "../components/containers/SectionContainer";
import Navbar from "../components/Controlbars/Navbar";
import { SectionContext } from "../contexts/SectionContext";
import './UserPage.css'
import { useHttpClient } from "../hooks/useHttpClient";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";


export const UserPage = () => {
  const [sectionId, setSectionId] = useState(null)
  const [sectionName, setSectionName] = useState("")
  const [sectionData, setSectionData] = useState(null)
  const [background, setBackground] = useState(null)
  const [navLinks, setNavlinks] = useState([])
  const [layout, setLayout] = useState(null)
  const mode = "edit"
  const auth = useContext(AuthContext)
  const navigate = useNavigate();
  const {isLoading, error, sendRequest} = useHttpClient();

  useEffect(() => {
    if(auth.isLoggedIn){
    (async() => {
    try {
      const response = await sendRequest(
        `https://x4hw8n8xca.execute-api.eu-north-1.amazonaws.com/prod/user/loadsections`,
        "POST",
        JSON.stringify({
          userId: auth.userId,
        }),
        {
          "Content-Type": "application/json",
          authorizationToken: `${auth.token},${auth.userId}`,
        }
      );
      const navs = response.sort((a, b) => {
        return a.sectionPosition - b.sectionPosition;
      });
      setNavlinks(navs)
      setLayout("gridLayout")
      setSectionName("Section header...")
      setBackground("#018be7")
      setSectionData([
      [
       {type: ""}
      ]
   ])
    } catch (error) {
      console.log(error)
    }
  })()
  } else {
    navigate('/')
  }
  },[auth.isLoggedIn])

    return (
      < SectionContext.Provider value={
        {
          sectionId: sectionId,
          sectionName: sectionName,
          background: background,
          navLinks: navLinks,
          layout: layout,
          sectionData: sectionData,
          mode: mode,
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
        <div className="usercolumn">
          <Navbar />
          <SectionContainer />
        </div>
      </div>
      </ SectionContext.Provider>
    );
}

export default UserPage;
