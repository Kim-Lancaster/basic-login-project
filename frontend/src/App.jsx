import React, { useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';
import Reset from './pages/Reset';
import Forgotpassword from './pages/Forgotpassword';
import { AuthContext } from './context/AuthContext'

function App(){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false)

  // const userMemo = useMemo(() => ({ user, setUser }), [user, setUser]);
  
  return <div className="container">
    <AuthContext.Provider value={{userState: [user, setUser], loadingState: [loading, setLoading]}}>
      <Routes>
      <Route path="/" element={<LoginPage />} />
      {user && <Route path="/user/:id" element={<Profile />} />}    
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/reset/:authString" element={<Reset />} />
      <Route path="/forgotpassword" element={<Forgotpassword />} />
    </Routes>
    </AuthContext.Provider>
  </div>
}

export default App;
