import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    userId: null,
    url: null,
    tokenExpirationDate: null,
    setUrl: () => {},
    login: () => {},
    logout: () => {},
    refreshToken: () => {}
})
