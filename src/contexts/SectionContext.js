import { createContext } from "react";

export const SectionContext = createContext({
    text: null,
    font: null,
    background: null,
    NavLinks: [],
    layout: null,
    setText: () => {},
    setFont: () => {},
    setBackground: () => {},
    setNavlinks: () => {},
    setLayout: () => {}
})
