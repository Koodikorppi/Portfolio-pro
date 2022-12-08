import React from 'react';
import './styles/App.css';
import { Routes, Route } from "react-router-dom";
import { useLoginHook } from './hooks/useLoginHook';
import { AuthContext } from './contexts/AuthContext';
import AuthPage from './pages/AuthPage';
import VerificationPage from './pages/VerificationPage';
import PreviewPage from './pages/PreviewPage';
import UserPage from './pages/UserPage';
import './styles/App.css'

// root app that contains the react router routes
const App = () => {
  const { token, userId, url, publish, setPublish, setUrl, login, logout, refreshToken } = useLoginHook()
  return (
    <div className="App">
      <AuthContext.Provider value={
        {
          isLoggedIn: !!token,
          token: token,
          url: url,
          publish: publish,
          setPublish: setPublish,
          setUrl: setUrl,
          login: login,
          logout: logout,
          refreshToken: refreshToken,
          userId: userId,
        }
      }>
        <Routes>
          <Route path="/" element={<AuthPage/>} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/preview/:name" element={<PreviewPage />} />
          <Route path="/user/:id/:verify/:hash" element={<VerificationPage />}/>
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
