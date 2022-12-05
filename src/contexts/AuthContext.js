import { createContext } from "react";

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
