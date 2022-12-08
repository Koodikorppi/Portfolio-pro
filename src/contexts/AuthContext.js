import { createContext } from "react";

// this is context component for sharing login related info withing components
export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    userId: null,
    url: null,
    publish: null,
    tokenExpirationDate: null,
    setUrl: () => {},
    login: () => {},
    logout: () => {},
    refreshToken: () => {},
    setPublish: () => {}
})
