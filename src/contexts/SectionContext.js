import { createContext } from "react";

export const SectionContext = createContext({
    text: null,
    font: null,
    background: null,
    navLinks: [],
    layout: null,
    sectionData: null,
    activeSection: null,
    setText: () => {},
    setFont: () => {},
    setBackground: () => {},
    setNavlinks: () => {},
    setLayout: () => {},
    setSectionData: () => {},
    setActiveSection: () => {}
})
