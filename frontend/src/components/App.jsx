import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignupForm';

function App(){

  const [signUp, setSignUp] = useState(false);

  const [apiResponse, setResponse] = useState();

  return (<div className='container'>
    <h1>Hello</h1>
    {signUp? 
      <SignUpForm setSignUp={setSignUp} setResponse={setResponse}/> : 
      <LoginForm setSignUp={setSignUp} setResponse={setResponse} />
      }
    <p>{apiResponse}</p>
  </div>)
}

export default App;
