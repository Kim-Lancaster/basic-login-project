import React from "react";
import { useParams } from 'react-router-dom';

function Reset(){
    
  const { authString } = useParams();
  const splitString = authString.split('&');
  const [token, email, date] = splitString;

  return <h1>{token}, {email}, {date}</h1>
}

export default Reset;