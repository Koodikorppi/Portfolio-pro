import React, {useContext} from "react";
import Authenticate from "../components/Authentication/Authenticate";
import { useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

export const AuthPage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  if(!auth.isLoggedIn){
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
    } else {
      navigate('/user')
    }
}

export default AuthPage;