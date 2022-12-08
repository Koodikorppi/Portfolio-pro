import { createContext } from "react";

// datacontext components that is essential for sharing all section related data between components
// this is also the data that is saved to database when saving section
export const SectionContext = createContext({
    sectionId: null,
    sectionName: null,
    background: null,
    navLinks: [],
    layout: null,
    sectionData: null,
    mode: null,
    publish: null,
    setPulish: () => {},
    setSectionId: () => {},
    setSectionName: () => {},
    setBackground: () => {},
    setNavlinks: () => {},
    setLayout: () => {},
    setSectionData: () => {},
})
