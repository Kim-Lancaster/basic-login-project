import React, { useState } from 'react';

import Profile from './Profile';
import LoginPage from './LoginPage';

function App(){

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [apiResponse, setResponse] = useState();

  function handleClick(){
    fetch('http://localhost:3001/users/forgotpassword', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: 'kim.lancaster@protonmail.com'})
    })
    console.log('im clicked')
  }
  return (<div className='container'>
    {!isLoggedIn && <h1>Hello</h1> }
    {isLoggedIn ? 
    <Profile user={apiResponse} setResponse={setResponse} setLoggedIn={setLoggedIn}  apiResponse={apiResponse}/> :
    <LoginPage setResponse={setResponse} setLoggedIn={setLoggedIn} />}
    {!isLoggedIn && <p>{apiResponse}</p>}
    <p className='forgot-password' onClick={handleClick}>Forgot Password?</p>
  </div>)
}

export default App;
