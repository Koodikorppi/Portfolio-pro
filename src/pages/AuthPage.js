import React from "react";
import Authenticate from "../components/Authentication/Authenticate";

export const AuthPage = () => {
    return (
      <><div className="hero">
          <div>
            <h1>Portfolio Pro</h1><i>Your outstanding showcase.</i>
          </div>
          <div className="heroimg"></div>
        </div>
      <Authenticate/>
      </>
      )
}

export default AuthPage;