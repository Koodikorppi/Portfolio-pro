import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../components/Controlbars/Sidebar";
import PreviewSectionContainer from "../components/containers/PreviewSectionContainer";
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
  const mode = "preview"

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
      if(error.code === 405){

      }
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
          mode: mode,
          setSectionId: setSectionId,
          setSectionName: setSectionName,
          setBackground: setBackground,
          setNavlinks: setNavlinks,
          setLayout: setLayout,
          setSectionData: setSectionData,
        }
      }>
      <div className="previewpage">
        <div className="previewcolumn">
          <Navbar />
          <PreviewSectionContainer />
        </div>
      </div>
      </ SectionContext.Provider>
    );
}

export default PreviewPage;
