import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignupForm';

function App(){

  const [signUp, setSignUp] = useState(false);

  return (<div className='container'>
    <h1>Hello</h1>
    {signUp? <SignUpForm setState={setSignUp}/> : <LoginForm setState={setSignUp} />}
  </div>)
}

export default App;
