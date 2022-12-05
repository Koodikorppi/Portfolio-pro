import { createContext } from "react";

export const SectionContext = createContext({
    sectionId: null,
    sectionName: null,
    background: null,
    navLinks: [],
    layout: null,
    sectionData: null,
    setSectionId: () => {},
    setSectionName: () => {},
    setBackground: () => {},
    setNavlinks: () => {},
    setLayout: () => {},
    setSectionData: () => {},
})
