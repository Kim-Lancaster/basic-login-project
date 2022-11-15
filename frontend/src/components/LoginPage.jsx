import React, { useState } from "react";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";

function LoginPage(props){

  const [signUp, setSignUp] = useState(false);

    return <div>
        {signUp? 
        <SignUpForm setSignUp={setSignUp} setResponse={props.setResponse}/> : 
        <LoginForm setSignUp={setSignUp} setResponse={props.setResponse} setLoggedIn={props.setLoggedIn} />
        }
        </div>
}

export default LoginPage