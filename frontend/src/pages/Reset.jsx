import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Buttons from "../components/Buttons";
import Input from "../components/Input";

function Reset(){
  /// destructuring the link string to get the data  
  const { authString } = useParams();
  const splitString = authString.split('&');
  const [user, token, email, date] = splitString;
  //password state
  const [password, setPassword] = useState();
  //message state
  const [msg, setMsg] = useState({
    success: null,
    error: null
  })
  const navigate = useNavigate();

  //creating new time to check of token is still valid
  const currentTime = String(new Date().getHours()) + String(new Date().getMinutes());
  const isValid = parseInt(currentTime) - parseInt(date);
  

  function handleChange(e){
    const {value} = e.target;
    setPassword(value);
   }

  function handleClick(e){
    e.preventDefault();
    fetch('http://localhost:3001/resetpassword', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user: user,
        token: token,
        email: email,
        changedPassword: password
      })
    })
    .then(response => response.json())
    .then(data => {
      if(data.success === true){
        setMsg({success: data.text, error: null});
      } else {
        setMsg({success: null, error: data.text})
      }
    })
  }


  return (<>
  {isValid < 101 ? 
  <>
  <div className="error">
    <p>{msg.error}</p>
  </div>
    {msg.success ? <h4>{msg.success}</h4> :
    <form>  
      <Input
        onChange={handleChange}
        value={password}
        type="password"
        placeholder="Enter new password"
        name="password"
        id="password"
      />
      <Buttons
        content="Reset Password"
        onClick={handleClick} />
    </form>}
  </>:
  <h1>Sorry, your token has expired</h1>
  }
  <p className='back-to-login' onClick={() => navigate('/')}>Back to log in page?</p>
  </>)
}

export default Reset;