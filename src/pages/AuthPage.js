import React, {useContext, useEffect} from "react";
import Authenticate from "../components/Authentication/Authenticate";
import { useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

// first page user will enter if not logged in
// handles singup/login and reroutes to user page if logged in
export const AuthPage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if(auth.isLoggedIn){
      navigate('/user')
    }
  }, [auth.isLoggedIn])


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