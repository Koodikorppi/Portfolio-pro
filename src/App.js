import React from 'react';
import './styles/App.css';
import { Routes, Route } from "react-router-dom";
import { useLoginHook } from './hooks/useLoginHook';
import { AuthContext } from './contexts/AuthContext';
import AuthPage from './pages/AuthPage';
import VerificationPage from './pages/VerificationPage';
import PreviewPage from './pages/PreviewPage';
import UserPage from './pages/UserPage';

const App = () => {
  const { token, userId, login, logout } = useLoginHook()
  console.log("app page")
  return (
    <div className="App">
      <AuthContext.Provider value={
        {
          isLoggedIn: !!token,
          token: token,
          login: login,
          logout: logout,
          userId: userId,
        }
      }>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/user/" element={<UserPage />} />
          <Route path="/user/:id/verify/:hash" element={<VerificationPage />}/>
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
