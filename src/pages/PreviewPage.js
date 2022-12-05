import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../components/Controlbars/Sidebar";
import SectionContainer from "../components/containers/SectionContainer";
import Navbar from "../components/Controlbars/Navbar";
import { SectionContext } from "../contexts/SectionContext";
import './UserPage.css'
import { useHttpClient } from "../hooks/useHttpClient";
import { useNavigate } from "react-router";

export const PreviewPage = () => {
  const [sectionId, setSectionId] = useState(null)
  const [sectionName, setSectionName] = useState("")
  const [sectionData, setSectionData] = useState(null)
  const [background, setBackground] = useState(null)
  const [navLinks, setNavlinks] = useState([])
  const [layout, setLayout] = useState(null)
  const navigate = useNavigate();
  const {isLoading, error, sendRequest} = useHttpClient();

  useEffect(() => {
    (async() => {
    try {
      const response = await sendRequest(
        `https://x4hw8n8xca.execute-api.eu-north-1.amazonaws.com/prod/loadpreviewsections`,
        "POST",
        JSON.stringify({
          url: window.location.href,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      const navs = response.sort((a, b) => {
        return a.sectionPosition - b.sectionPosition;
      });
      setNavlinks(navs)
      setLayout("gridLayout")
      setSectionData([
      [
       {type: ""}
      ]
   ])
    } catch (error) {
      console.log(error)
    }
  })()
  },[])

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
}

export default PreviewPage;
