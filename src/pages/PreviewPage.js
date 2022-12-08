import React, { useState, useEffect } from "react";
import PreviewSectionContainer from "../components/containers/PreviewSectionContainer";
import Navbar from "../components/Controlbars/Navbar";
import { SectionContext } from "../contexts/SectionContext";
import './PreviewPage.css'
import { useHttpClient } from "../hooks/useHttpClient";
import { LoadingNotif } from "../components/common/LoadingNotif";

// this is the page that is presented when using the public link url that visitors can use
// it fill first try to get all sections from user and then it will present the first section by default
// it will also show to visitor if page is not public
export const PreviewPage = () => {
  const [sectionId, setSectionId] = useState(null)
  const [sectionName, setSectionName] = useState("")
  const [sectionData, setSectionData] = useState(null)
  const [background, setBackground] = useState(null)
  const [navLinks, setNavlinks] = useState([])
  const [layout, setLayout] = useState(null)
  const [publish, setPublish] = useState(false)
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
        return a.position - b.position;
      });
      setNavlinks(navs)
      setLayout("gridLayout")
      setSectionData([
      [
       {type: ""}
      ]
   ])
     setPublish(true)
    } catch (error) {
      if(error.code === 405){
        setPublish(false)
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
          publish: publish,
          setPulish: setPublish,
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
          {publish ? <PreviewSectionContainer /> :
            <div className="site-notpub">NO PUBLIC PORTFOLIO WITH THIS ADDRESS!</div>
          }
        </div>
        <LoadingNotif state={isLoading}/>
      </div>
      </ SectionContext.Provider>
    );
}

export default PreviewPage;
