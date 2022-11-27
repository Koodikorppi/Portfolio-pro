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

const App = () => {
  const { token, userId, login, logout, refreshToken } = useLoginHook()
  return (
    <div className="App">
      <AuthContext.Provider value={
        {
          isLoggedIn: !!token,
          token: token,
          login: login,
          logout: logout,
          refreshToken: refreshToken,
          userId: userId,
        }
      }>
        <Routes>
          <Route path="/" element={!!token ? <UserPage /> : <AuthPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/user/:id/verify/:hash" element={<VerificationPage />}/>
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
