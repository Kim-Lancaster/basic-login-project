import React, { useState } from 'react';

import Profile from './Profile';
import LoginPage from './LoginPage';

function App(){

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [apiResponse, setResponse] = useState();

  return (<div className='container'>
    {!isLoggedIn && <h1>Hello</h1> }
    {!isLoggedIn ? <Profile user={apiResponse} setResponse={setResponse} setLoggedIn={setLoggedIn} /> :
    <LoginPage setResponse={setResponse} setLoggedIn={setLoggedIn}/>}
    {!isLoggedIn && <p>{apiResponse}</p>}


  </div>)
}

export default App;
