import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Profile from './pages/Profile';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';
import Reset from './pages/Reset';

function App(){

  return <div className="container">
    <Routes>
    <useAuth.Provider>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/user/:id" element={<Profile />} />
    </useAuth.Provider>
    <Route path="/reset/:authString" element={<Reset />} />
  </Routes></div>
}

export default App;
